const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    message: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

messageSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Message", messageSchema)
