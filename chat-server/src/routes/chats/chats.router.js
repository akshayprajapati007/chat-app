const express = require("express")
const { getChatsList, accessChat } = require("./chats.controller")
const { validateToken } = require("../../jwt")
const AppRoutings = require("../../utility/app-routings")

const chatsRouter = express.Router()

chatsRouter.get(AppRoutings.Chats, validateToken, getChatsList)
chatsRouter.post(AppRoutings.AccessChat, validateToken, accessChat)

module.exports = chatsRouter
