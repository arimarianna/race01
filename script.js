const fs = require('fs')

function getCardNames() {
    let data = JSON.parse(fs.readFileSync('./client/src/assets/atlas/cards.json', 'utf-8'));
    let cards = []
    data.frames.forEach(element => {
        cards.push(element.filename)
    });
    fs.writeFileSync('cardnames.json', JSON.stringify(cards), 'utf-8', (err) => {
        console.error(err)
    })
    console.log(cards)

}
//////

const capitalize = (s) => {
    if (typeof s !== 'string') return s
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function BigNames() {
    let data = JSON.parse(fs.readFileSync('./cardnames.json', 'utf-8'));
    let obj = {};

    data.forEach(card => {
        obj[card] = card.split('-').map(s => capitalize(s)).join('');
    });
    return obj;
}
///// 

function upper(string) {
    return string.split('-').map(s => capitalize(s)).join('');
}

/////

// console.log(BigNames()['venom'])
// console.log(upper('bebrocka-df-rtert-1'))
// getCardNames();


/*
cardBack: new CardBack(scene),
cardStack: new CardStack(scene),
boolean: new Boolean(scene),
ping: new Ping(scene)
*/
const decapitalize = (s) => {
    if (typeof s !== 'string') return s
    return s.charAt(0).toLowerCase() + s.slice(1)
}

function cards() {
    let data = BigNames();
    console.log(data)
    let res = ''
    for (key in data) {
        // console.log(key)
        res += `${decapitalize(data[key])}: new ${data[key]}(scene),\n`
    }
    return res
}

// cards()
// console.log(cards())


/*
import CardStack from './cards/CardStack';
*/
function imports() {
    let data = BigNames();
    console.log(data)
    let res = ''
    for (key in data) {
        // console.log(key)
        res += `import ${data[key]} from './cards/${data[key]}';\n`
    }
    return res
}

// console.log(imports())

/*import Card from "./Card.js";

export default class CardStack extends Card {
    constructor(scene) {
        super(scene);
        this.name = "cardStack";
        this.playerCardSprite = "cardStack";
        this.opponentCardSprite = "cardStack";
    }
}*/


function classes() {
    let data = BigNames();
    for (key in data) {
        let res = 'import Card from "./Card.js"\n'

        // console.log(key, data[key])
        res += `export default class ${BigNames()[key]} extends Card {
    constructor(scene) {
        super(scene);
        this.name = "${key}";
        this.playerCardSprite = "${key}";
        this.opponentCardSprite = "${key}";
    }
}`
        fs.writeFileSync(`./client/src/helpers/cards/${BigNames()[key]}.js`, res, 'utf-8', (err) => {
            if (err) console.error(err)
        })
    }

    // console.log(res)
}

classes()