const express = require("express")
const {
  handleGetUserDetails,
  handleSearchUserByName,
  handleFriendRequest,
  handleRemoveFriend,
} = require("./users.controller")
const { validateToken } = require("../../jwt")
const AppRoutings = require("../../utility/app-routings")

const usersRouter = express.Router()

usersRouter.get(AppRoutings.GetUserDetails, validateToken, handleGetUserDetails)
usersRouter.get(AppRoutings.searchUsers, validateToken, handleSearchUserByName)
usersRouter.post(AppRoutings.friendRequest, validateToken, handleFriendRequest)
usersRouter.delete(AppRoutings.removeFriend, validateToken, handleRemoveFriend)

module.exports = usersRouter
