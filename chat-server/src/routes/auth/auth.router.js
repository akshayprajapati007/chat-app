const express = require("express")

const { validateToken } = require("../../jwt")
const { handleLogin, handleSignOut } = require("./auth.controller")
const AppRoutings = require("../../utility/app-routings")

const authRouter = express.Router()
authRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "ChatKI APIs..",
  })
})
authRouter.post(AppRoutings.SignIn, handleLogin)
authRouter.post(AppRoutings.SignOut, handleSignOut)
authRouter.get(AppRoutings.Profile, validateToken, handleSignOut)

module.exports = authRouter
