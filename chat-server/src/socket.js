const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected")

    // Handle socket.io events here

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  })
}

module.exports = setupSocket
