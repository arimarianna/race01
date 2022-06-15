const server = require('express')();
const fs = require('fs')
const http = require('http').createServer(server);
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');
const shuffle = require('shuffle-array');
let gameState = "Initializing";
let players = {};
let readyCheck = 0;
let cardsInDeck = [];
let playerCards = []
let allPlayed
let allPowers = []

let cardProps = JSON.parse(fs.readFileSync('./cardprops.json'))
let cards = JSON.parse(fs.readFileSync('./cardNamesArrays.json'))

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele !== value;
    });
}

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080/",
        methods: ["GET", "POST"]
    }
});

server.use(cors());
server.use(serveStatic(__dirname + "/client/dist"));

io.on('connection', function (socket) {

    console.log('A user connected: ' + socket.id);

    players[socket.id] = {
        inHand: [],
        isPlayerA: false,
        healh: 20,
        playedCard: '',
        playerCard: '',
        powers: {}
    };

    if (Object.keys(players).length % 2 == 1) {
        players[socket.id].isPlayerA = true;
        io.emit('firstTurn');
    }

    socket.on('dealDeck', function (socketId) {
        allPlayed = 0
        playerCards = shuffle(cards.player)
        cardsInDeck = shuffle(cards.subject);

        if (Object.keys(players).length < 2) return;
        io.emit('changeGameState', "Initializing");
        console.log(playerCards, cardsInDeck)
    })

    socket.on('dealCards', function (socketId) {

        if (playerCards.length < 2) {
            playerCards = shuffle(cards.player)
        }
        if (cardsInDeck.length < 6) {
            cardsInDeck = shuffle(cards.subject)
        }
        players[socketId].playerCard = playerCards.shift()
        for (let i = 0; i < 3; i++) {
            players[socketId].inHand.push(cardsInDeck.shift());
        }

        io.emit('dealCards', socketId, players[socketId].inHand, players[socketId].playerCard);
        readyCheck++;
        if (readyCheck >= 2) {
            gameState = "Ready";
            io.emit('changeGameState', "Ready");
        }
    });

    socket.on('cardPlayed', function (cardName, socketId) {
        if (typeof (cardName) === 'undefined') {
            io.emit('notChangeTurn');
            return
        }

        allPlayed++
        players[socketId].inHand = arrayRemove(players[socketId].inHand, cardName);
        players[socketId].playedCard = cardName;
        io.emit('cardPlayed', cardName, socketId);

        io.emit('changeTurn');
        if (cardProps.subject[cardName] && cardProps.player[players[socketId].playerCard]) {
            players[socketId].powers = {
                sid: socketId,
                attack: cardProps.subject[cardName].attack + cardProps.player[players[socketId].playerCard].attack,
                defense: cardProps.subject[cardName].defense + cardProps.player[players[socketId].playerCard].defense,
                quickness: cardProps.subject[cardName].quickness + cardProps.player[players[socketId].playerCard].quickness,
            }
            allPowers.push(players[socketId].powers)
        }

        console.log(allPlayed)
        console.log(players);

        if (allPlayed == 2) {
            if (allPowers[0].attack > allPowers[1].defense && allPowers[0].quickness > allPowers[1].quickness) {
                console.log('attackerWin')
                io.emit('attackerWin', allPowers[1].sid, allPowers[0].attack/10)
                io.emit('attackerWin', allPowers[0].sid)

            }
            if (allPowers[0].attack < allPowers[1].defense || allPowers[0].quickness < allPowers[1].quickness) {
                console.log('defenderWin')
                io.emit('defenderWin', allPowers[0].sid)
                io.emit('defenderWin', allPowers[1].sid)
            }
        }
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        delete players[socket.id];
    });
});

const port = process.env.PORT || 3000;

http.listen(port, function () {
    console.log('Server started!');
});
