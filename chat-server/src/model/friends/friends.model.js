const friends = require("./friends.mongo")
const users = require("../users/users.mongo")
const mongoose = require("mongoose")
const FriendshipStatus = require("../../utility/friendship-status")
const { findUserByEmail } = require("../users/users.model")

const getFriendsList = async (email) => {
  const { _id: userId } = await findUserByEmail(email)

  try {
    const friendsList = await friends.find({
      $and: [
        { $or: [{ sender: userId }, { receiver: userId }] },
        { status: "accepted" },
      ],
    })

    if (!friendsList || friendsList.length === 0) {
      return []
    }

    const friendUserIds = friendsList.map((friend) =>
      friend.sender.equals(userId) ? friend.receiver : friend.sender
    )

    const friendDetails = await users.find(
      { _id: { $in: friendUserIds } },
      { firstName: 1, lastName: 1, email: 1, profileImage: 1 }
    )

    return friendDetails
  } catch (error) {
    console.error("Error finding user friends:", error)
    throw error
  }
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
