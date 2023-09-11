const otps = require("./otps.mongo")

const findOTPByEmail = async (email) => {
  return await otps.findOne({
    email,
  })
}

const saveOTP = async (otpInfo) => {
  return await otps.updateOne(
    {
      email: otpInfo.email,
    },
    {
      $set: { ...otpInfo },
    },
    {
      upsert: true,
    }
  )
}

const removeOTP = async (email) => {
  return await otps.deleteOne({
    email,
  })
}

module.exports = {
  saveOTP,
  findOTPByEmail,
  removeOTP,
}
