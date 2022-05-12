import Listing from "../models/Listing.js";

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

export const createListing = async (req, res) => {
  const listing = req.body;
  console.log(listing);

  try {
    const newListing = new Listing(listing);
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
