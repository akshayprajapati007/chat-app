const { validateSocketToken } = require("./jwt")

const setupSocket = (io) => {
  io.use(validateSocketToken)
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      socket.join(userId)
      socket.emit("connected")
    })

    socket.on("join room", (chatId) => {
      socket.join(chatId)
    })

    socket.on("message", async (messageData) => {
      try {
        const { chat } = messageData

        socket.to(chat).emit("message received", messageData)
      } catch (error) {
        console.error("Error handling message event:", error)
      }
    })

    socket.on("typing", async (chatId, sender) => {
      try {
        socket.to(chatId).emit("user typing", sender)
      } catch (error) {
        console.error("Error handling typing event:", error)
      }
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected")
    })

    socket.on("leave", (userId) => {
      socket.leave(userId)
      console.log(`User ${userId} left their own room`)
    })
  })
}

module.exports = setupSocket
