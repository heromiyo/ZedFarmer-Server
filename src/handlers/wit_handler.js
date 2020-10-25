const { getRandomFact } = require('../../helpers/data_utils')
const { getTrait } = require('../../helpers/data_utils')

require('dotenv').config()
const { getTrait, } = require('../helpers/data_utils')

async function handleResponseFromWit(data) {
    const intent = data.intents.length > 0 && data.intents[0] || '__data__'

    if (intent === '__data__') {
        let trait = Object.keys(data.traits.length === 0 ? '__data__' : getTrait(data.traits))

        switch(trait.name) {
            case 'wit$thanks': 
                return {intent: 'thanks', 'message' : 'Anytime!', type: 'string'}
            case 'wit$greetings':
                return {intent: 'greeting', 'message': 'Hi there!', type: 'string'}
            case 'wit$bye': 
                return {intent: 'bye', 'message': 'Bye-bye', type: 'string '}
        }
        return handleGibberish()
    } else {
        switch(intent.name) {
            // handle cases for farmer information 
            case 'get_fact': 
                return handleGetFact() 
            case 'get_info': 
                return handleGetInfo() 
        }

        return handleGibberish()
    }
}

function handleGibberish() {
    return {
        intent: 'gibberish',
        message: "Sorry, I didnt understand that, Ask something like, 'whats the best season to grow maize in zambia? or 'Whats the best crop to grow in Zambia' ",
        type: 'string'
    }
}

function handleGetFact() {
    let fact = getRandomFact()
    return {
        intent: 'fact', 'message': fact, 
        type: 'string'
    }
}

function handleGetInfo() {
    return {
        intent: 'info',
        message: 'Hi am ZedFarmer bot, i will answer your questions about farming in Zambia',
        type: 'string '
    }
}


exports.handleResponseFromWit = handleResponseFromWit