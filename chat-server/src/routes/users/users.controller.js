const {
  findUserByName,
  findUserByEmail,
  getUserProfileById,
  findUserById,
} = require("../../model/users/users.model")
const {
  createFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getFriendsList,
  getFriendRequestsList,
  getFriendRequestsCount,
} = require("../../model/friends/friends.model")
const FriendshipStatus = require("../../utility/friendship-status")
const { findChatById } = require("../../model/chats/chats.model")

const handleGetUserDetails = async (req, res) => {
  try {
    const { email } = req.headers
    const { id } = req.query
    const user = await getUserProfileById(email, id)

    if (!user)
      return res.status(400).json({
        success: false,
        error: "User doesn't exist!",
      })

    return res.status(200).json({
      success: true,
      data: user,
    })
  } catch (err) {
    console.log("error", err)
    return res.status(500).json({
      success: false,
      error: err,
    })
  }
}

const handleSearchUserByName = async (req, res) => {
  try {
    const { email } = req.headers
    const { search, page, perPage } = req.query
    const users = await findUserByName(email, search, page, perPage)

    if (!users)
      return res.status(400).json({
        success: false,
        error: "User doesn't exist!",
      })

    return res.status(200).json({
      success: true,
      data: users,
    })
  } catch (err) {
    console.log("error", err)
    return res.status(500).json({
      success: false,
      error: err,
    })
  }
}

const handleFriendRequest = async (req, res) => {
  try {
    const { email } = req.headers
    const { receiverId, status } = req.body
    const { _id: loggedInUserId } = await findUserByEmail(email)

    if (status === FriendshipStatus.pending)
      await createFriendRequest(loggedInUserId, receiverId)
    if (status === FriendshipStatus.noRelation)
      await cancelFriendRequest(loggedInUserId, receiverId)
    if (status === FriendshipStatus.accepted)
      await acceptFriendRequest(receiverId, loggedInUserId)
    if (status === FriendshipStatus.rejected)
      await rejectFriendRequest(receiverId, loggedInUserId)

    const user = await getUserProfileById(email, receiverId)
    return res.status(200).json({
      success: true,
      data: user,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: err,
    })
  }
}

const handleRemoveFriend = async (req, res) => {
  try {
    const { email } = req.headers
    const { recipientId } = req.params
    const { _id: loggedInUserId } = await findUserByEmail(email)

    const result = await removeFriend(loggedInUserId, recipientId)
    const user = await getUserProfileById(email, recipientId)
    return res.status(200).json({
      success: true,
      data: user,
    })
  } catch (err) {
    console.log("error", err)
    return res.status(500).json({
      success: false,
      data: err,
    })
  }
}

const friendsList = async (req, res) => {
  try {
    const { email } = req.headers
    const { search, page, perPage } = req.query
    const { friends, currentPage, totalPages } = await getFriendsList(
      email,
      search,
      page,
      perPage
    )

    return res.status(200).json({
      success: true,
      data: friends,
      pagination: {
        currentPage,
        totalPages,
      },
    })
  } catch (err) {
    console.log("error", err)
    return res.status(500).json({
      success: false,
      data: err,
    })
  }
}

const friendRequestsList = async (req, res) => {
  try {
    const { email, page, perPage } = req.headers
    const response = await getFriendRequestsList(email, page, perPage)

    return res.status(200).json({
      success: true,
      data: response,
    })
  } catch (err) {
    console.log("error", err)
    return res.status(500).json({
      success: false,
      data: err,
    })
  }
}

const getUserDetailsByChatId = async (req, res) => {
  const { _id } = req.user
  const { chatId } = req.params

  try {
    const chatDetails = await findChatById(chatId)
    if (chatDetails) {
      const { users } = chatDetails
      const recipientId = users.filter(
        (userId) => userId.toString() !== _id.toString()
      )
      const user = await findUserById(recipientId)
      return res.status(200).json({
        success: true,
        data: user,
      })
    } else {
      return res.status(400).json({
        error: "Invalid chat",
        success: false,
      })
    }
  } catch (err) {
    console.log("error", err)
    return res.status(500).json({
      success: false,
      data: err,
    })
  }
}

const getUserProfileMetaData = async (req, res) => {
  try {
    const { _id } = req.user
    const totalFriendRequests = await getFriendRequestsCount(_id)

    return res.status(200).json({
      success: true,
      data: {
        totalFriendRequests,
      },
    })
  } catch (err) {
    console.log("error", err)
    return res.status(500).json({
      success: false,
      data: err,
    })
  }
}

module.exports = {
  handleGetUserDetails,
  handleSearchUserByName,
  handleFriendRequest,
  handleRemoveFriend,
  friendsList,
  friendRequestsList,
  getUserDetailsByChatId,
  getUserProfileMetaData,
}
