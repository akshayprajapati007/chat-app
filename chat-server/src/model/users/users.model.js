const users = require("./users.mongo")
const friends = require("../friends/friends.mongo")
const mongoose = require("mongoose")

const findUserByEmail = async (email) => {
  const user = await users.findOne(
    {
      email,
    },
    "-__v"
  )
  return user
}

const findUserByName = async (email, searchQuery, page, perPage) => {
  const regex = new RegExp(searchQuery, "i")
  const skip = (page - 1) * perPage

  const { _id } = await findUserByEmail(email)

  const usersWithFriendshipStatus = await users.aggregate([
    {
      $match: {
        $and: [
          {
            email: { $ne: email },
            isEmailVerified: true,
            $or: [
              { firstName: { $regex: regex } },
              { lastName: { $regex: regex } },
            ],
          },
        ],
      },
    },
    {
      $lookup: {
        from: "friends",
        let: { userId: new mongoose.Types.ObjectId(_id) },
        pipeline: [
          {
            $match: {
              $or: [
                { $expr: { $eq: ["$sender", "$$userId"] } },
                { $expr: { $eq: ["$receiver", "$$userId"] } },
              ],
            },
          },
        ],
        as: "friendships",
      },
    },
    {
      $project: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        profileImage: 1,
        friendshipStatus: {
          $cond: {
            if: { $gt: [{ $size: "$friendships" }, 0] },
            then: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$friendships.status", "accepted"] },
                    then: "accepted",
                  },
                  {
                    case: { $eq: ["$friendships.status", "pending"] },
                    then: "pending",
                  },
                  {
                    case: { $eq: ["$friendships.status", "rejected"] },
                    then: "rejected",
                  },
                ],
                default: "",
              },
            },
            else: "",
          },
        },
      },
    },
    { $skip: skip },
  ])

  return usersWithFriendshipStatus
}

const getUserProfileById = async (email, recipientUserId) => {
  try {
    const { _id: loggedInUserId } = await findUserByEmail(email)

    const userWithFriendshipStatus = await users.findOne(
      {
        _id: new mongoose.Types.ObjectId(recipientUserId),
        isEmailVerified: true,
      },
      {
        __v: 0,
        createdAt: 0,
        isEmailVerified: 0,
        password: 0,
      }
    )

    if (userWithFriendshipStatus) {
      const friendships = await friends.findOne({
        $or: [
          {
            sender: loggedInUserId,
            receiver: recipientUserId,
          },
          {
            sender: recipientUserId,
            receiver: loggedInUserId,
          },
        ],
      })
      const userObject = userWithFriendshipStatus.toObject()
      userObject.friendshipStatus = friendships ? friendships.status : ""

      return userObject
    } else {
      return null
    }
  } catch (error) {
    console.log("error", error)
  }
}

const getAllUsers = async () => {
  return await users.find({}, "-__v")
}

const registerUser = async (user) => {
  try {
    const newUser = new users(user)
    await newUser.save()
    return user
  } catch (error) {
    return error
  }
}

const verifyUserEmail = async (email) => {
  const user = await users.updateOne(
    {
      email,
    },
    {
      $set: { isEmailVerified: true },
    },
    {
      new: true,
    }
  )
  return user
}

const updateUser = async (email, userDetails) => {
  return await users.updateOne(
    {
      email: email,
    },
    {
      $set: { ...userDetails },
    },
    {
      upsert: true,
    }
  )
}

module.exports = {
  getAllUsers,
  findUserByEmail,
  findUserByName,
  getUserProfileById,
  registerUser,
  verifyUserEmail,
  updateUser,
}
