import Listing from "../models/Listing.js";
import mongoose from "mongoose";

export const createListing = async (req, res) => {
  const listing = req.body;

  console.log(listing);
  try {
    const newListing = new Listing({
      ...listing,
      createdAt: new Date().toISOString(),
    });
    await newListing.save();
    res.status(200).json({ data: newListing });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getListings = async (req, res) => {
  const listings = await Listing.find();
  // listings is array
  try {
    res.status(200).json({
      data: listings,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getListing = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteListing = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No listing with id: ${id}` });
    }
    await Listing.findByIdAndRemove(id);
    const listings = await Listing.find();
    res.status(200).json({
      data: listings,
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateListing = async (req, res) => {
  const { id } = req.params;
  const updatedListing = req.body;

  // console.log(id);
  // console.log(updatedListing);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No listing exist with id: ${id}` });
    }

    await Listing.findByIdAndUpdate(id, {
      ...updatedListing,
      createdAt: new Date().toISOString(),
    });
    const updatedListings = await Listing.find();

    res.status(200).json({ data: updatedListings });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
