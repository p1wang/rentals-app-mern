import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  messageTitle: { type: String, trim: true },
  messageBody: { type: String, trim: true },
  senderName: String,
  senderPfp: String,
  senderEmail: String,
  receiverId: String,
  senderId: String,
});

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
