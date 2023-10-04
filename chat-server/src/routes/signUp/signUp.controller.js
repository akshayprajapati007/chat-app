const { generateHashPassword } = require("../../authorization")
const {
  findUserByEmail,
  registerUser,
} = require("../../model/users/users.model")
const { sendOTP } = require("../../routes/otp/otp.controller")

const handleSignUp = async (req, res) => {
  const { email, firstName, lastName, password } = req.body
  const isEmailExist = await findUserByEmail(email)

  if (isEmailExist)
    return res.status(400).json({
      error: "Email is already exist!",
    })

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({
      error: "Missing required fields!",
    })
  }

  try {
    const hasPassword = await generateHashPassword(password)
    req.body.password = hasPassword
    const userDetails = {
      profileImage: "",
      isEmailVerified: false,
      ...req.body,
    }
    const user = await registerUser({ ...userDetails })
    await sendOTP(email)
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

module.exports = {
  handleSignUp,
}
