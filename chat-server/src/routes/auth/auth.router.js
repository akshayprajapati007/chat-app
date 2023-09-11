const express = require("express")

const { validateToken } = require("../../jwt")
const { handleLogin, handleSignOut } = require("./auth.controller")
const AppRoutings = require("../../utility/app-routings")

const authRouter = express.Router()

authRouter.post(AppRoutings.SignIn, handleLogin)
authRouter.post(AppRoutings.SignOut, handleSignOut)
authRouter.get(AppRoutings.Profile, validateToken, handleSignOut)

module.exports = authRouter
