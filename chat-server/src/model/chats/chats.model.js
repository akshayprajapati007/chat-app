const chats = require("./chats.mongo")

const findChatBySenderAndRecipient = async (senderId, recipientId) => {
  const chatList = await chats.find(
    {
      senderId,
      recipientId,
    },
    "-__v"
  )
  return chatList
}

const saveMessage = async (messageData) => {
  try {
    const newMessage = new chats(messageData)
    await newMessage.save()
    return newMessage
  } catch (error) {
    return error
  }
}

module.exports = {
  saveMessage,
  findChatBySenderAndRecipient,
}
