import { connect } from "http2";
import WebSocket, { WebSocketServer } from "ws";
const http = require('http')
const url = require('url')

const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000
const connections = {}
const users = {}

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString())
  console.log(`${username} connected`)
  const user = user[uuid]
  user.state = message
  broadcast()
  console.log(`${user.username} updated status: ${JSON.stringify(user.state)}`)
}

const handleClose = uuid => {
  console.log(`${users[uuid].username} disconnected`)
  delete connections[uuid]
  delete users[uuid]
}

const broadcast = () => {
  Object
    .keys(connections)
    .forEach(uuid => {
      const connection = connections[uuid]
      const message = JSON.stringify(users)
      connection.send(message)
    })
}

wsServer.on("connection", (ws) => {
  console.log("a new client connected");
});
