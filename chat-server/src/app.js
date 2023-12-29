const express = require("express")
const cors = require("cors")

const authRouter = require("./routes/auth/auth.router")
const otpRouter = require("./routes/otp/otp.router")
const signUpRouter = require("./routes/signUp/signUp.router")
const profileRouter = require("./routes/profile/profile.router")
const usersRouter = require("./routes/users/users.router")
const chatsRouter = require("./routes/chats/chats.router")
const messagesRouter = require("./routes/messages/messages.router")

const app = express()

app.use(cors())
app.use(express.json({ limit: "10mb" }))

app.use(authRouter)
app.use(otpRouter)
app.use(signUpRouter)
app.use(profileRouter)
app.use(usersRouter)
app.use(chatsRouter)
app.use(messagesRouter)

module.exports = app
