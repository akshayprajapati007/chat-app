const express = require("express")
const {
  handleGetUserDetails,
  handleSearchUserByName,
  handleFriendRequest,
  handleRemoveFriend,
  friendsList,
  friendRequestsList,
  getUserDetailsByChatId,
  getUserProfileMetaData,
} = require("./users.controller")
const { validateToken } = require("../../jwt")
const AppRoutings = require("../../utility/app-routings")

const usersRouter = express.Router()

usersRouter.get(AppRoutings.GetUserDetails, validateToken, handleGetUserDetails)
usersRouter.get(
  AppRoutings.GetUserByChatId,
  validateToken,
  getUserDetailsByChatId
)
usersRouter.get(AppRoutings.searchUsers, validateToken, handleSearchUserByName)
usersRouter.get(AppRoutings.friends, validateToken, friendsList)
usersRouter.get(
  AppRoutings.friendRequestsList,
  validateToken,
  friendRequestsList
)
usersRouter.get(
  AppRoutings.GetUserProfileMetaData,
  validateToken,
  getUserProfileMetaData
)
usersRouter.post(AppRoutings.friendRequest, validateToken, handleFriendRequest)
usersRouter.delete(AppRoutings.removeFriend, validateToken, handleRemoveFriend)

module.exports = usersRouter
