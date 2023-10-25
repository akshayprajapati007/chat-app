const friends = require("./friends.mongo")

const getFriendsList = async (userId) => {
  return await friends.find(
    { status: "accepted", $or: [{ sender: userId }, { receiver: userId }] },
    "-__v"
  )
}

const createFriendRequest = async (request) => {
  try {
    const newRequest = new friends(request)
    await newRequest.save()
    return user
  } catch (error) {
    return error
  }
}

const acceptFriendRequest = async (requestId) => {
  return await friends.updateOne(
    {
      _id: requestId,
      status: "pending",
    },
    {
      $set: { status: "accepted" },
    },
    {
      upsert: true,
    }
  )
}

module.exports = {
  getFriendsList,
  createFriendRequest,
  acceptFriendRequest,
}
