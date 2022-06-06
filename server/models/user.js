import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  profilePic: { type: String, default: "" },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
