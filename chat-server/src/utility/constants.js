const JWT_EXPIRATION_TIME = "1d"
const ID_HEADER = "_id"
const EMAIL_HEADER = "email"
const AUTHORIZATION_HEADER = "authorization"

const HASH_ROUNDS = 10

const MAIL_HOST = "smtp.gmail.com"
const MAIL_PORT = 587
const EMAIL_VERIFICATION_SUBJECT = "Email verification"
const EMAIL_VERIFICATION_TEXT = "Verification code is"

module.exports = {
  JWT_EXPIRATION_TIME,
  AUTHORIZATION_HEADER,
  ID_HEADER,
  EMAIL_HEADER,
  HASH_ROUNDS,
  MAIL_HOST,
  MAIL_PORT,
  EMAIL_VERIFICATION_SUBJECT,
  EMAIL_VERIFICATION_TEXT,
}
