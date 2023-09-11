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

  const hasPassword = await generateHashPassword(password)
  req.body.password = hasPassword
  const user = await registerUser({ isEmailVerified: false, ...req.body })
  const response = await sendOTP(email)
  return res.status(201).json(user)
}

module.exports = {
  handleSignUp,
}
