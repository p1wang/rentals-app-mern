import express from "express";

import {
  getListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
  likeListing,
  getListingsByUser,
  getLikedListings,
  getListingsByQuery
} from "../controllers/listings.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getListings);
router.get("/search", getListingsByQuery);
router.get("/userListings/:id", auth, getListingsByUser);
router.get("/likedListings/:id", auth, getLikedListings);
router.get("/:id", getListing);
router.post("/", auth, createListing);
router.delete("/:id", auth, deleteListing);
router.patch("/:id", auth, updateListing);
router.patch("/:id/likes", auth, likeListing);

export default router;
