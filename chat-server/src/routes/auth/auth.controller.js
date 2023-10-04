const { comparePasswords } = require("../../authorization")
const { generateToken } = require("../../jwt")
const { findUserByEmail } = require("../../model/users/users.model")

const handleLogin = async (req, res) => {
  const { email, password } = req.body
  const user = await findUserByEmail(email)

  if (!user)
    return res.status(400).json({
      success: false,
      error: "User doesn't exist!",
    })

  const isPasswordMatch = await comparePasswords(password, user.password)

  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      error: "Invalid credentials!",
    })
  }

  if (!user.isEmailVerified) {
    return res.status(401).json({
      success: false,
      error: "Email not verified!",
    })
  }

  const { firstName, lastName, profilePicture } = user
  const token = generateToken({
    email,
    firstName,
    lastName,
  })

  return res.status(200).json({
    token,
    success: true,
    data: {
      email,
      firstName,
      lastName,
      profilePicture,
    },
  })
}

const handleSignOut = async (req, res) => {
  return res.status(200).json({
    data: "Logout successfully",
  })
}

module.exports = {
  handleLogin,
  handleSignOut,
}
