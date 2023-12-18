const express = require("express")
const {
  handleGetUserDetails,
  handleSearchUserByName,
  handleFriendRequest,
  handleRemoveFriend,
  friendsList,
  friendRequestsList,
} = require("./users.controller")
const { validateToken } = require("../../jwt")
const AppRoutings = require("../../utility/app-routings")

const usersRouter = express.Router()

usersRouter.get(AppRoutings.GetUserDetails, validateToken, handleGetUserDetails)
usersRouter.get(AppRoutings.searchUsers, validateToken, handleSearchUserByName)
usersRouter.get(AppRoutings.friends, validateToken, friendsList)
usersRouter.get(
  AppRoutings.friendRequestsList,
  validateToken,
  friendRequestsList
)
usersRouter.post(AppRoutings.friendRequest, validateToken, handleFriendRequest)
usersRouter.delete(AppRoutings.removeFriend, validateToken, handleRemoveFriend)

module.exports = usersRouter
