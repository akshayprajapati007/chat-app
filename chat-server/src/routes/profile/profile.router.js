const express = require("express")
const { updateProfile, updateProfileImage } = require("./profile.controller")
const { validateToken } = require("../../jwt")
const AppRoutings = require("../../utility/app-routings")

const profileRouter = express.Router()

profileRouter.post(AppRoutings.UpdateProfile, validateToken, updateProfile)
profileRouter.post(
  AppRoutings.UpdateProfileImage,
  validateToken,
  updateProfileImage
)

module.exports = profileRouter
