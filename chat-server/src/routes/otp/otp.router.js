const express = require("express")
const { handleOTP, validateOTP } = require("./otp.controller")
const AppRoutings = require("../../utility/app-routings")

const otpRouter = express.Router()

otpRouter.post(AppRoutings.sendOTP, handleOTP)
otpRouter.post(AppRoutings.AccountVerification, validateOTP)

module.exports = otpRouter
