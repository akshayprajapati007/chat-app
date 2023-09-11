const getTokenFromHeader = (headerToken) => {
  const tokensParts = headerToken.split(" ")
  const token = tokensParts?.length > 0 ? tokensParts[1] : ""
  return token
}

const generateOTP = () => {
  return Math.floor(Math.random() * 10000 + 1)
}

module.exports = {
  getTokenFromHeader,
  generateOTP,
}
