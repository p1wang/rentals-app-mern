import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  messages: [
    {
      messageTitle: String,
      messageBody: String,
      senderName: String,
      senderPfp: { type: String, default: "" },
      senderId: mongoose.SchemaTypes.ObjectId,
    },
  ],
  profilePic: { type: String, default: "" },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
