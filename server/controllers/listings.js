import ListingModel from "../models/listing.js";
import UserModel from "../models/user.js";
import mongoose from "mongoose";

// create listings
export const createListing = async (req, res) => {
  const listing = req.body;

  console.log(req.userId);
  try {
    const existingUser = await UserModel.findOne({ _id: req.userId });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const newListing = new ListingModel({
      ...listing,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newListing.save();
    res.status(200).json(newListing);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// get listings
export const getListings = async (req, res) => {
  const listings = await ListingModel.find();

  try {
    res.status(200).json(listings);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// get a listing
export const getListing = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No listing with id: ${id}` });
    }

    const listing = await ListingModel.findById(id);
    res.status(200).json(listing);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// delete listing
export const deleteListing = async (req, res) => {
  const { id } = req.params;

  try {
    // check if user exists
    const existingUser = await UserModel.findOne({ _id: req.userId });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    // check if listing exists
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No listing with id: ${id}` });
    }
    await ListingModel.findByIdAndRemove(id);
    res.status(200).json(id);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// update listing
export const updateListing = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const existingUser = await UserModel.findOne({ _id: req.userId });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No listing with id: ${id}` });
    }

    const updatedListing = await ListingModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// like listing
export const likeListing = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.userId);

  try {
    const existingUser = await UserModel.findOne({ _id: req.userId });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No listing with id: ${id}` });
    }

    const oldListing = await ListingModel.findById(id);

    if (oldListing.length === 0) {
      oldListing.likes.push(req.userId);
    } else if (oldListing.likes.includes(req.userId)) {
      oldListing.likes = oldListing.likes.filter((id) => id !== req.userId);
    } else {
      oldListing.likes.push(req.userId);
    }

    // if (oldListing.likes.includes(req.userId)) {
    //   // filter function creates new array
    //   oldListing.likes = oldListing.likes.filter((id) => id !== req.userId);
    // } else {
    //   // modifies array in place
    //   oldListing.likes.push(req.userId);
    // }

    console.log(oldListing);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No listing exist with id: ${id}` });
    }

    const updatedListing = await ListingModel.findByIdAndUpdate(
      id,
      oldListing,
      {
        new: true,
      }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
