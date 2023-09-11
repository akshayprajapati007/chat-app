const express = require("express")
const cors = require("cors")

const { CLIENT_URL } = require("./configs")
const authRouter = require("./routes/auth/auth.router")
const otpRouter = require("./routes/otp/otp.router")
const signUpRouter = require("./routes/signUp/signUp.router")

const app = express()

app.use(
  cors({
    origin: CLIENT_URL,
  })
)
app.use(express.json())

app.use(authRouter)
app.use(otpRouter)
app.use(signUpRouter)

module.exports = app
