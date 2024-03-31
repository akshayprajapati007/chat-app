const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const friendsSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

friendsSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Friend", friendsSchema)
