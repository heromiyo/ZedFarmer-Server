
require('dotenv').config()
const fs = require('fs')

function getTrait(traits) {
    let traitNames = Object.keys(traits)
    let max = 0
    let fin 

    for(const trait of traits) {
        if(traits[trait][0].confidence >= max) {
            max = traits[trait][0].confidence
            traits[trait][0]['name'] = trait 
            fin = traits[trait]

        }
    }

    return fin[0]
}


function getRandomFact() {
    let rawdata = fs.readFileSync('./src/data/data.json')
    let facts = JSON.parse(rawdata).facts
    let rannum = Math.floor(Math.random() * 100) % facts.length 

    return facts[rannum].fact 
}

module.exports = { getTrait, getRandomFact}