const express = require("express")
const { validateToken } = require("../../jwt")
const {
  handleGetMessages,
  handleMessageSave,
} = require("./messages.controller")
const AppRoutings = require("../../utility/app-routings")

const messagesRouter = express.Router()

messagesRouter.get(AppRoutings.GetMessages, validateToken, handleGetMessages)
messagesRouter.post(AppRoutings.SendMessage, validateToken, handleMessageSave)

module.exports = messagesRouter
