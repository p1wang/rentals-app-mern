import express from "express";

import {
  sendMessage,
  signIn,
  signUp,
  updateUser,
  deleteMessage,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/update", auth, updateUser);
router.patch("/:id/messages", auth, sendMessage);
router.patch("/messages/:id/delete", auth, deleteMessage);

export default router;
