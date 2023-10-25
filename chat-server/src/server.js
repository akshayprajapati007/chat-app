require("dotenv").config()
const http = require("http")
const socketIo = require("socket.io")

const app = require("./app.js")
const setupSocket = require("./socket.js")
const { SERVER_PORT, CLIENT_URL } = require("./configs/index")
const initiateMongoose = require("./mongoose.js")
const PORT = SERVER_PORT || 8000

const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: CLIENT_URL,
  },
})
setupSocket(io)

const startServer = async () => {
  await initiateMongoose()
  server.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`))
}

startServer()
