import jwt from "jsonwebtoken";

import UserModel from "../models/user.js"

const secret = "auth";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;

    // email auth
    decodedData = jwt.verify(token, secret);
    req.userId = decodedData?.id;
    req.userEmail = decodedData?.email;

    const existingUser = await UserModel.findOne({ _id: req.userId });

    if (!existingUser) {
      throw new Error();
    }

    next();
  } catch (error) {
    res.status(401).send({ message: "Please Authenticate" });
  }
};

export default auth;
