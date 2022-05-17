import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  name: String,
  message: String,
  sender: String,
  receiver: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
