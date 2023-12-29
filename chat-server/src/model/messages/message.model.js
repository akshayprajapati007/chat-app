const messages = require("./messages.mongo")

const getMessages = async (query) => {
  try {
    const messagesList = await messages.find(query, "-__v")
    return messagesList
  } catch (error) {
    throw new Error(error)
  }
}

const saveMessage = async (messageData) => {
  try {
    const newMessage = await messages.create(messageData)
    return newMessage
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getMessages,
  saveMessage,
}
