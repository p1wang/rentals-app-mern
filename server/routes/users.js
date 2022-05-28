import express from "express";

import { signIn, signUp, updateUser } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.patch("/update", auth, updateUser);

export default router;
