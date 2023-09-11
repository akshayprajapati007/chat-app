const express = require("express")
const { handleSignUp } = require("./signUp.controller")
const AppRoutings = require("../../utility/app-routings")

const signUpRouter = express.Router()

signUpRouter.post(AppRoutings.SignUp, handleSignUp)

module.exports = signUpRouter
