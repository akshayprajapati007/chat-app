const { sign, verify } = require("jsonwebtoken")

const {
  JWT_EXPIRATION_TIME,
  AUTHORIZATION_HEADER,
} = require("./utility/constants.js")
const { JWT_TOKEN_SECRET } = require("./configs")

const generateToken = (info) => {
  const accessToken = sign(info, JWT_TOKEN_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  })
  return accessToken
}

const validateToken = (req, res, next) => {
  const token = req.headers[AUTHORIZATION_HEADER]

  if (!token)
    return res.status(400).json({
      error: "User is not authenticated!",
    })

  try {
    const isValidToken = verify(token, JWT_TOKEN_SECRET)
    if (isValidToken) {
      return next()
    }
  } catch (err) {
    return res.status(401).json({
      error: err.message,
    })
  }
}

module.exports = {
  generateToken,
  validateToken,
}
