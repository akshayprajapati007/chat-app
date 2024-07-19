const messages = require("./messages.mongo")

const getMessages = async (query, page = 1, limit = 10) => {
  try {
    const options = {
      page,
      limit,
      select: "-__v",
    }

    const result = await messages.paginate(query, options)

    return {
      totalCount: result.totalDocs,
      totalPages: result.totalPages,
      currentPage: result.page,
      messages: result.docs,
    }
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
