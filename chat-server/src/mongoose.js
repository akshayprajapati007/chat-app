const mongoose = require("mongoose")

const { MONGO_PASSWORD } = require("./configs")

const MONGO_URL = `mongodb+srv://chat-app:${MONGO_PASSWORD}@chat-cluster.l6h7ups.mongodb.net/?retryWrites=true&w=majority`

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!")
})

mongoose.connection.on("error", (error) => {
  console.error(error)
})

const initiateMongoose = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = initiateMongoose
