import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  messageTitle: String,
  messageBody: String,
  senderName: String,
  senderPfp: String,
  senderEmail: String,
  receiverId: String,
  senderId: String,
});

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
