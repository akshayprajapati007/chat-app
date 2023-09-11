const { hash, compare } = require("bcrypt")
const { HASH_ROUNDS } = require("./utility/constants.js")

const generateHashPassword = async (password) => {
  return await hash(password, HASH_ROUNDS)
}

const comparePasswords = async (password, hashPassword) => {
  return await compare(password, hashPassword)
}

module.exports = {
  generateHashPassword,
  comparePasswords,
}
