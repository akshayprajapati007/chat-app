const {
  saveMessage,
  findChatBySenderAndRecipient,
} = require("../../model/chats/chats.model")

const handleMessageSave = async (message) => {
  try {
    return await saveMessage(message)
  } catch (err) {
    console.log("error", err)
  }
}

const getRelevantAllMessages = async (senderId, recipientId) => {
  try {
    return await findChatBySenderAndRecipient(senderId, recipientId)
  } catch (err) {
    console.log("error", err)
  }
}

module.exports = {
  handleMessageSave,
  getRelevantAllMessages,
}
