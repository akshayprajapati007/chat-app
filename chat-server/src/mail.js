const mail = require("nodemailer")
const { EMAIL_USER, EMAIL_PASS } = require("./configs")
const {
  EMAIL_VERIFICATION_SUBJECT,
  EMAIL_VERIFICATION_TEXT,
} = require("./utility/constants")

const transporter = mail.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
})

const otpMailSender = (to, otp) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject: EMAIL_VERIFICATION_SUBJECT,
    text: `${EMAIL_VERIFICATION_TEXT} ${otp}`,
  }

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log("here", err)
      return false
    }
    return true
  })
}

module.exports = otpMailSender
