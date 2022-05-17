import express from "express";

import {
  getListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
  likeListing,
} from "../controllers/listings.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getListings);
router.get("/:id", getListing);
router.post("/", auth, createListing);
router.delete("/:id", auth, deleteListing);
router.patch("/:id", auth, updateListing);
router.patch("/:id/likes", auth, likeListing);

export default router;
