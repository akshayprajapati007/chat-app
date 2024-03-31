const mongoose = require("mongoose")
const friends = require("./friends.mongo")
const users = require("../users/users.mongo")
const FriendshipStatus = require("../../utility/friendship-status")
const { findUserByEmail } = require("../users/users.model")

const getFriendsList = async (email, search, page, perPage) => {
  const searchRegex = new RegExp(search, "i")
  const skip = (page - 1) * perPage

  try {
    const { _id: userId } = await findUserByEmail(email)

    const friendsQuery = {
      $and: [
        { $or: [{ sender: userId }, { receiver: userId }] },
        { status: "accepted" },
      ],
    }

    const friendsList = await friends.paginate(friendsQuery, {
      page,
      limit: perPage,
    })

    const friendUserIds = friendsList.docs.map((friend) =>
      friend.sender.equals(userId) ? friend.receiver : friend.sender
    )

    const usersQuery = {
      _id: { $in: friendUserIds },
      $or: [
        { firstName: { $regex: searchRegex } },
        { lastName: { $regex: searchRegex } },
      ],
    }

    const friendDetails = await users.paginate(usersQuery, {
      page,
      limit: perPage,
      select: { firstName: 1, lastName: 1, email: 1, profileImage: 1 },
    })

    return {
      friends: friendDetails.docs,
      totalFriends: friendsList.totalDocs,
      currentPage: friendsList.page,
      totalPages: friendsList.totalPages,
    }
  } catch (error) {
    console.error("Error finding user friends:", error)
    throw error
  }
}

const getFriendRequestsList = async (email, page, perPage) => {
  const skip = (page - 1) * perPage
  const { _id: userId } = await findUserByEmail(email)

  try {
    const friendRequestsList = await friends.find({
      receiver: userId,
      status: "pending",
    })

    if (!friendRequestsList || friendRequestsList.length === 0) {
      return []
    }

    const friendUserIds = friendRequestsList.map((friend) => friend.sender)

    const friendDetails = await users
      .find(
        { _id: { $in: friendUserIds } },
        { firstName: 1, lastName: 1, email: 1, profileImage: 1 }
      )
      .skip(skip)
      .limit(perPage)

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
  getFriendRequestsList,
  createFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
}
