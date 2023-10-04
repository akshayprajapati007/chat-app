const users = require("./users.mongo")

const findUserByEmail = async (email) => {
  const user = await users.findOne(
    {
      email,
    },
    "-__v"
  )
  return user
}

const getAllUsers = async () => {
  return await users.find({}, "-__v")
}

const registerUser = async (user) => {
  try {
    const newUser = new users(user)
    await newUser.save()
    const data = { ...user }
    return {
      data,
      success: true,
      message: "Account created successfully",
    }
  } catch (error) {
    return error
  }
}

const verifyUserEmail = async (email) => {
  const response = await users.updateOne(
    {
      email,
    },
    {
      $set: { isEmailVerified: true },
    },
    {
      new: true,
    }
  )
  return response
}

module.exports = {
  getAllUsers,
  findUserByEmail,
  registerUser,
  verifyUserEmail,
}
