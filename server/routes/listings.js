import express from "express";
import {
  getListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
} from "../controllers/listings.js";

const router = express.Router();

router.get("/", getListings);
router.get("/:id", getListing);
router.post("/", createListing);
router.delete("/:id", deleteListing);
router.patch("/:id", updateListing);

export default router;
