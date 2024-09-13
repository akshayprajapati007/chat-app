const {
  saveMessage,
  getMessages,
} = require("../../model/messages/message.model")
const { findUserByEmail } = require("../../model/users/users.model")

const handleGetMessages = async (req, res) => {
  try {
    const { chatId } = req.params
    const { page, per } = req.query
    if (!chatId) {
      return res
        .status(400)
        .json({ error: "Chat id is not given!" })
        .populate("sender", "firstName lastName profileImage email")
        .populate("chat")
    }
    const query = {
      chat: chatId,
    }
    const messages = await getMessages(query, page, per)
    return res.status(200).json({
      success: true,
      data: messages,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error })
  }
}

const handleMessageSave = async (req, res) => {
  try {
    const { email } = req.headers
    const { chatId, message } = req.body

    const { _id } = await findUserByEmail(email)
    const newMessage = {
      chat: chatId,
      message,
      sender: _id,
      seen: false,
    }
    const chat = await saveMessage(newMessage)
    return res.status(200).json({
      success: true,
      data: chat,
    })
  } catch (error) {
    console.log("error", err)
    return res.status(500).json({ error })
  }
}

module.exports = {
  handleMessageSave,
  handleGetMessages,
}
