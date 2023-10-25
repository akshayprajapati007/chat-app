const express = require("express")
const {
  handleSearchUserByName,
  handleNewFriendRequest,
} = require("./users.controller")
const { validateToken } = require("../../jwt")
const AppRoutings = require("../../utility/app-routings")

const usersRouter = express.Router()

usersRouter.get(AppRoutings.searchUsers, validateToken, handleSearchUserByName)
usersRouter.post(
  AppRoutings.friendRequest,
  validateToken,
  handleNewFriendRequest
)

module.exports = usersRouter
