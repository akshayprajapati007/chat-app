const {
  handleMessageSave,
} = require("./socketControllers/chats/chats.controller")

let connectedUsers = {}

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      socket.join(userId)
      connectedUsers[userId] = socket.id
    })

    socket.on("message", async (data) => {
      //const recipientSocketId = io.sockets.adapter.rooms.get(data.recipientId)
      const { recipientId, message } = data
      const recipientSocketId = connectedUsers[recipientId]

      try {
        const response = await handleMessageSave(data)
        if (response && recipientSocketId) {
          io.to(recipientId).emit("message", message)
        }
      } catch (err) {
        console.log("error", err)
      }
    })

    socket.on("disconnect", (userId) => {
      if (connectedUsers[userId]) {
        delete connectedUsers[userId]
      }
    })
  })
}

module.exports = setupSocket
