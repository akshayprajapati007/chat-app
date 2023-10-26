const {
  findUserByName,
  getUserProfileById,
} = require("../../model/users/users.model")
const { createFriendRequest } = require("../../model/friends/friends.model")

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

const handleNewFriendRequest = async (req, res) => {
  try {
    const users = await createFriendRequest(req.body)

    return res.status(200).json({
      success: true,
      data: users,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: err,
    })
  }
}

module.exports = {
  handleGetUserDetails,
  handleSearchUserByName,
  handleNewFriendRequest,
}
