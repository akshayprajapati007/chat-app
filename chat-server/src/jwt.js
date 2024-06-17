const { sign, verify } = require("jsonwebtoken")

const {
  JWT_EXPIRATION_TIME,
  AUTHORIZATION_HEADER,
  EMAIL_HEADER,
} = require("./utility/constants.js")
const { JWT_TOKEN_SECRET } = require("./configs")
const { findUserByEmail } = require("./model/users/users.model.js")

const generateToken = (info) => {
  const accessToken = sign(info, JWT_TOKEN_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  })
  return accessToken
}

const validateToken = async (req, res, next) => {
  const token = req.headers[AUTHORIZATION_HEADER]

  if (!token)
    return res.status(400).json({
      error: "User is not authenticated!",
    })

  try {
    const tokenData = verify(token, JWT_TOKEN_SECRET)
    if (tokenData) {
      req.user = await findUserByEmail(tokenData.email)
      req.headers[EMAIL_HEADER] = tokenData.email
      return next()
    }
  } catch (err) {
    return res.status(401).json({
      error: err.message,
    })
  }
}

const validateSocketToken = async (socket, next) => {
  const token = socket.handshake.auth.token

  if (!token) {
    return next(new Error("User is not authenticated!"))
  }

  try {
    const tokenData = verify(token, JWT_TOKEN_SECRET)
    if (tokenData) {
      const user = await findUserByEmail(tokenData.email)
      if (!user) {
        return next(new Error("User not found!"))
      }
      socket.user = user
      socket.email = tokenData.email
      return next()
    }
  } catch (err) {
    return next(new Error("Invalid token!"))
  }
}

module.exports = {
  generateToken,
  validateToken,
  validateSocketToken,
}
