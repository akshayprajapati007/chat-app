const otpMailSender = require("../../mail")
const { generateOTP } = require("../../utility/helper")
const {
  saveOTP,
  findOTPByEmail,
  removeOTP,
} = require("../../model/otps/otps.model")
const { verifyUserEmail } = require("../../model/users/users.model")
const { generateToken } = require("../../jwt")

const sendOTP = async (email) => {
  const otp = generateOTP()

  const otpInfo = {
    email,
    otp,
    expireIn: new Date().getTime() + 300 * 1000,
  }

  const res = await saveOTP(otpInfo)
  otpMailSender(email, otp)
}

const handleOTP = async (req, res) => {
  const { email } = req.body

  try {
    await sendOTP(email)
    return res.status(200).json({
      data: "OTP sent successfully",
    })
  } catch (error) {
    return res.status(500).json({
      error,
    })
  }
}

const validateOTP = async (req, res) => {
  const { email, otp } = req.body

  try {
    const response = await findOTPByEmail(email)
    const { expireIn } = response

    const currentDate = new Date()
    const currentTime = currentDate.getTime()
    const timeDiff = expireIn - currentTime

    if (timeDiff < 0) {
      return res.status(400).json({
        error: "Verification code is expired!",
      })
    } else {
      if (response.otp === Number(otp)) {
        await removeOTP(email)
        const user = await verifyUserEmail(email)
        const { _id, email, firstName, lastName, profileImage } = user
        const userDetails = { _id, email, firstName, lastName, profileImage }
        const token = generateToken({
          mail,
          firstName,
          lastName,
        })

        return res.status(200).json({
          token,
          data: userDetails,
          success: true,
          message: "Verification code verified successfully!",
        })
      } else {
        return res.status(400).json({
          success: false,
          error: "Invalid verification code!",
        })
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}

module.exports = {
  sendOTP,
  handleOTP,
  validateOTP,
}
