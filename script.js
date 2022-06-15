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

}

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

function upper(string) {
    return string.split('-').map(s => capitalize(s)).join('');
}

const decapitalize = (s) => {
    if (typeof s !== 'string') return s
    return s.charAt(0).toLowerCase() + s.slice(1)
}

function cards() {
    let data = BigNames();
    let res = ''
    for (key in data) {
        res += `"${decapitalize(data[key])}", `
    }
    return res
}

function imports() {
    let data = BigNames();
    let res = ''
    for (key in data) {
        res += `import ${data[key]} from './cards/${data[key]}';\n`
    }
    return res
}

function classes() {
    let data = BigNames();
    for (key in data) {
        let res = 'import Card from "./Card.js"\n'

        res += `export default class ${BigNames()[key]} extends Card {
    constructor(scene) {
        super(scene);
        this.name = "${decapitalize(data[key])}";
        this.playerCardSprite = "${decapitalize(data[key])}";
        this.opponentCardSprite = "${decapitalize(data[key])}";
    }
}`
        fs.writeFileSync(`./client/src/helpers/cards/${BigNames()[key]}.js`, res, 'utf-8', (err) => {
            if (err) console.error(err)
        })
    }
}

    loadImages()

function loadImages() {
    let data = BigNames()
    let res = ''
    for (key in data) {
        res += `this.load.image('${decapitalize(data[key])}', 'src/assets/${key}.png');\n`
    }
}

let data = JSON.parse(fs.readFileSync('./cardprops.json', 'utf-8'));
let obj = {}
for (key in data.player) {
    console.log(key)
    obj[decapitalize(upper(key))] = data.player[key]
}
console.log(JSON.stringify(obj))
