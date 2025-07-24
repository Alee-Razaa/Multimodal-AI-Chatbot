const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
}, { _id: false }); 

const conversationSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: false, 
  },
  title: {
    type: String,
    required: false,
  },
  messages: [messageSchema],
}, { timestamps: true }); 

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
