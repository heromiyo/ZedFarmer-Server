const app = require('express')()
const server = require('http').createServer(app)
const socketio = require('socket.io')
const bodyParser = require('body-parser')
const client = require('./src/config/wit.config')
const handler = require('./src/handlers/wit_handler')
require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: true}))
let data = undefined

// setup socket.io 

const io = socketio(server)

io.on('connection', async (socket) => {
    console.log("CONNECTED")
    // get data 

    socket.on('send_query', async (query) => {
        // wit.ai 
        client
            .message(query.message)
            .then(res => handler.handleResponseFromWit(res) )
            .then(msg => {
                socket.emit('receive_message', msg)
            })
            .catch(err => {
                console.error(
                    'Oops, Got an error from Wit.ai',
                    err.stack || err 
                );
                socket.emit('receive_message', err)
            })
    })
})


const port = process.env.PORT || 8000

server.listen(port, () => {
    console.log('Server running on: ' + port);
})