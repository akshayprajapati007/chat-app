const SERVER_PORT = process.env.PORT
const CLIENT_URL = process.env.CLIENT_URL
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

const EMAIL_USER = process.env.MAIL_USER
const EMAIL_PASS = process.env.MAIL_PASS

module.exports = {
  SERVER_PORT,
  CLIENT_URL,
  JWT_TOKEN_SECRET,
  MONGO_PASSWORD,
  EMAIL_USER,
  EMAIL_PASS,
}
