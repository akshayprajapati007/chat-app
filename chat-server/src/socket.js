const { findChatById } = require("./model/chats/chats.model")

let connectedUsers = {}

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      socket.join(userId)
      socket.emit("connected")
    })

    socket.on("join room", (chatId) => {
      socket.join(chatId)
    })

    socket.on("message", async (messageData) => {
      const { chat, sender } = messageData

      const { users } = await findChatById(chat)

      users.forEach((user) => {
        if (user.toString() === sender) return
        socket.in(user.toString()).emit("message received", messageData)
      })
    })

    socket.off("join", () => {
      socket.leave(userId)
    })
  })
}

module.exports = setupSocket
