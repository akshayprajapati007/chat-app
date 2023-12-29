const {
  findChatsList,
  findChat,
  createChat,
} = require("../../model/chats/chats.model")
const { findUserByEmail } = require("../../model/users/users.model")

const accessChat = async (req, res) => {
  try {
    const { email } = req.headers
    const { recipientId } = req.body
    if (!recipientId) {
      return res.status(400).json({
        error: "Recipient id does not exist",
      })
    }

    const { _id } = await findUserByEmail(email)
    const query = {
      $and: [
        { users: { $elemMatch: { $eq: _id } } },
        { users: { $elemMatch: { $eq: recipientId } } },
      ],
    }
    const existingChat = await findChat(query)
    if (existingChat) {
      return res.status(200).json({
        success: true,
        data: existingChat,
      })
    }
    const chat = {
      users: [_id, recipientId],
    }
    const newChat = await createChat(chat)
    const fullChat = await findChat({ _id: newChat._id })

    return res.status(200).json({
      success: true,
      data: fullChat,
    })
  } catch (err) {
    console.log("error", err)
  }
}

const getChatsList = async (req, res) => {
  try {
    const { email } = req.headers
    const { _id } = await findUserByEmail(email)
    const data = await findChatsList(_id)
    const result = {
      success: true,
      data,
    }
    return res.status(200).json(result)
  } catch (err) {
    console.log("error", err)
  }
}

module.exports = {
  getChatsList,
  accessChat,
}
