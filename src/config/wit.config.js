const { Wit, log} = require('node-wit')
require('dotenv').config()

const client = new Wit({
    accessToken: process.env.WIT_TOKEN,
    logger: new logger(log.DEBUG)
})

module.exports = client

