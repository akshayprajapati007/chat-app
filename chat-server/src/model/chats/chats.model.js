const users = require("../users/users.mongo")
const chats = require("./chats.mongo")

const findChatsList = async (currentUserId) => {
  const chatsList = await chats
    .find(
      {
        users: { $elemMatch: { $eq: currentUserId } },
      },
      "-__v"
    )
    .populate("users", "-password -isEmailVerified -__v -createdAt")
    .populate("lastMessage")
    .sort({ updatedAt: -1 })

  const newList = await users.populate(chatsList, {
    path: "lastMessage.sender",
    select: "firstName lastName email profileImage",
  })
  return newList
}

const findChatById = async (chatId) => {
  return await chats.findById(chatId)
}

const findChat = async (query) => {
  return await chats
    .findOne(query)
    .populate("users", "-password -isEmailVerified")
    .populate("lastMessage")
}

const createChat = async (chat) => {
  return await chats.create(chat)
}

module.exports = {
  createChat,
  findChat,
  findChatsList,
  findChatById,
}
