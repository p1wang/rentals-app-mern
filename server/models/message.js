import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  messageTitle: { type: String, trim: true },
  messageBody: { type: String, trim: true },
  senderName: String,
  senderPfp: String,
  senderEmail: String,
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
