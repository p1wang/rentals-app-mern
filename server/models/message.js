import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    name: String,
    message: String,
    sender: String,
    receiver: String,
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
