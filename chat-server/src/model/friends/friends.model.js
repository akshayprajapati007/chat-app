const friends = require("./friends.mongo")
const mongoose = require("mongoose")
const FriendshipStatus = require("../../utility/friendship-status")

const getFriendsList = async (userId) => {
  return await friends.find(
    {
      status: FriendshipStatus.accepted,
      $or: [{ sender: userId }, { receiver: userId }],
    },
    "-__v"
  )
}

const createFriendRequest = async (senderId, recipientId) => {
  try {
    const request = {
      sender: new mongoose.Types.ObjectId(senderId),
      receiver: new mongoose.Types.ObjectId(recipientId),
      status: FriendshipStatus.pending,
    }
    const newRequest = new friends(request)
    await newRequest.save()
    return user
  } catch (error) {
    return error
  }
}

const cancelFriendRequest = async (senderId, recipientId) => {
  try {
    const sender = new mongoose.Types.ObjectId(senderId)
    const receiver = new mongoose.Types.ObjectId(recipientId)

    return await friends.deleteOne({
      status: FriendshipStatus.pending,
      sender: sender,
      receiver: receiver,
    })
  } catch (error) {
    return error
  }
}

const acceptFriendRequest = async (senderId, recipientId) => {
  try {
    const sender = new mongoose.Types.ObjectId(senderId)
    const receiver = new mongoose.Types.ObjectId(recipientId)
    return await friends.updateOne(
      {
        sender: sender,
        receiver: receiver,
      },
      {
        $set: { status: FriendshipStatus.accepted },
      },
      {
        upsert: true,
      }
    )
  } catch (error) {
    return error
  }
}

const rejectFriendRequest = async (senderId, recipientId) => {
  try {
    const sender = new mongoose.Types.ObjectId(senderId)
    const receiver = new mongoose.Types.ObjectId(recipientId)
    return await friends.updateOne(
      {
        sender: sender,
        receiver: receiver,
      },
      {
        $set: { status: FriendshipStatus.rejected },
      },
      {
        upsert: true,
      }
    )
  } catch (error) {
    return error
  }
}

const removeFriend = async (senderId, recipientId) => {
  try {
    const sender = new mongoose.Types.ObjectId(senderId)
    const receiver = new mongoose.Types.ObjectId(recipientId)

    return await friends.deleteOne({
      $and: [
        {
          $or: [{ sender: sender }, { receiver: sender }],
        },
        {
          $or: [{ sender: receiver }, { receiver: receiver }],
        },
      ],
    })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getFriendsList,
  createFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
}
