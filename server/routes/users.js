import express from "express";

import {
  sendMessage,
  signIn,
  signUp,
  updateUser,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/:id", auth, updateUser);
router.patch("/:id/messages", auth, sendMessage);

export default router;
