const { updateUser, findUserByEmail } = require("../../model/users/users.model")

const updateProfile = async (req, res) => {
  const email = req.headers.email
  try {
    await updateUser(email, req.body)
    const user = await findUserByEmail(email)
    const { firstName, lastName, profileImage } = user

    return res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        email,
        firstName,
        lastName,
        profileImage,
      },
    })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

const updateProfileImage = async (req, res) => {
  const email = req.headers.email
  try {
    await updateUser(email, req.body)
    const user = await findUserByEmail(email)
    const { firstName, lastName, profileImage } = user

    return res.status(201).json({
      success: true,
      message: "Profile photo updated successfully",
      data: {
        email,
        firstName,
        lastName,
        profileImage,
      },
    })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

module.exports = {
  updateProfile,
  updateProfileImage,
}
