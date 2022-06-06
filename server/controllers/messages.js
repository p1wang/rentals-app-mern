import UserModel from "../models/user.js";
import messageModel from "../models/message.js";
import MessageModel from "../models/message.js";

// getMessages
export const getMessages = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const userMessages = await MessageModel.find({ receiverId: id });

    res.status(201).json(userMessages);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// sendMessage
export const sendMessage = async (req, res) => {
  const { messageTitle, messageBody, receiverId } = req.body;

  console.log(messageTitle);

  try {
    const sender = await UserModel.findById({ _id: req.userId });

    const newMessage = new messageModel({
      messageTitle: messageTitle,
      messageBody: messageBody,
      senderEmail: sender.email,
      senderName: sender.name,
      senderPfp: sender.profilePic,
      senderId: req.userId,
      receiverId: receiverId,
    });
    await newMessage.save();

    res.status(201).json({ message: "Message successfully received." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// deleteMessage
export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    await messageModel.findByIdAndDelete(id);

    res.status(201).json(id);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
