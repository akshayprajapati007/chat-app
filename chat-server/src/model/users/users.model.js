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
    return user
  } catch (error) {
    return error
  }
}

const verifyUserEmail = async (email) => {
  const user = await users.updateOne(
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
  return user
}

const updateUser = async (email, userDetails) => {
  return await users.updateOne(
    {
      email: email,
    },
    {
      $set: { ...userDetails },
    },
    {
      upsert: true,
    }
  )
}

module.exports = {
  getAllUsers,
  findUserByEmail,
  registerUser,
  verifyUserEmail,
  updateUser,
}
