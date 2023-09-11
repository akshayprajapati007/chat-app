const mongoose = require("mongoose")

const otpsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  expireIn: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model("Otp", otpsSchema)
