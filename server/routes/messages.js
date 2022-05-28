import express from "express";

import {
  deleteMessage,
  getMessages,
  sendMessage,
} from "../controllers/messages.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/userMessages/:id", auth, getMessages);
router.post("/", auth, sendMessage);
router.delete("/:id", auth, deleteMessage);

export default router;
