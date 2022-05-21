import jwt from "jsonwebtoken";

const secret = "auth";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;

    // email auth
    decodedData = jwt.verify(token, secret);
    req.userId = decodedData?.id;
    req.userEmail = decodedData?.email;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
