const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const usersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

usersSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("User", usersSchema)
