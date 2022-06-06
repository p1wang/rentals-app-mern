import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = "auth";

// signIn
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// signUp
export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = new UserModel({
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    await result.save();

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// updateUser
export const updateUser = async (req, res) => {
  const update = req.body;
  const { id } = req.params;
  console.log(id);
  console.log(req.userId);

  try {
    if (update.password) {
      const saltRounds = 10;
      update.password = await bcrypt.hash(update.password, saltRounds);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.userId,
      { $set: update },
      {
        new: true,
      }
    );

    const token = jwt.sign(
      { email: updatedUser.email, id: updatedUser._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ result: updatedUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
