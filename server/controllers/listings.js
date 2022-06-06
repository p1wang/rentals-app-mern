import ListingModel from "../models/listing.js";
import UserModel from "../models/user.js";

// create listings
export const createListing = async (req, res) => {
  const listing = req.body;

  console.log(listing);

  try {
    const newListing = new ListingModel({
      ...listing,
      creator: req.userId,
      creatorEmail: req.userEmail,
    });
    await newListing.save();

    res.status(200).json(newListing);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// getListings
export const getListings = async (req, res) => {
  const { page } = req.query;
  console.log(page);
  const limit = 9;

  try {
    const total = await ListingModel.countDocuments({});

    const listings = await ListingModel.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.status(200).json({ totalPages: Math.ceil(total / limit), listings });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// get a listing
export const getListing = async (req, res) => {
  const { id } = req.params;

  try {
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

  console.log(update);

  try {
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

  try {
    const oldListing = await ListingModel.findById(id);

    if (oldListing.likes.includes(req.userId)) {
      oldListing.likes = oldListing.likes.filter((id) => id !== req.userId);
    } else {
      oldListing.likes.push(req.userId);
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

// getListingsByUser
export const getListingsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userListings = await ListingModel.find({ creator: id });
    res.status(200).json(userListings);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// getLikedListings
export const getLikedListings = async (req, res) => {
  const { id } = req.params;

  try {
    const likedListings = await ListingModel.find({ likes: id });

    res.status(200).json(likedListings);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

// getListingsByQuery
export const getListingsByQuery = async (req, res) => {
  const {
    bedrooms,
    bathrooms,
    parkings,
    price,
    agreementType,
    unitType,
    page,
  } = req.query;

  console.log(unitType);

  const limit = 9;

  console.log(page);

  try {
    const filteredListings = await ListingModel.find({
      $and: [
        { bedrooms: bedrooms ? { $eq: bedrooms } : { $exists: true } },
        { bathrooms: bathrooms ? { $eq: bathrooms } : { $exists: true } },
        { parkings: parkings ? { $eq: parkings } : { $exists: true } },
        { price: price ? { $lt: price } : { $exists: true } },
        {
          agreementType: agreementType
            ? { $eq: agreementType }
            : { $exists: true },
        },
        { unitType: unitType ? { $eq: unitType } : { $exists: true } },
      ],
    });

    const total = filteredListings.length;

    const limitedFilteredListings = await ListingModel.find({
      $and: [
        { bedrooms: bedrooms ? { $eq: bedrooms } : { $exists: true } },
        { bathrooms: bathrooms ? { $eq: bathrooms } : { $exists: true } },
        { parkings: parkings ? { $eq: parkings } : { $exists: true } },
        { price: price ? { $lt: price } : { $exists: true } },
        {
          agreementType: agreementType
            ? { $eq: agreementType }
            : { $exists: true },
        },
        { unitType: unitType ? { $eq: unitType } : { $exists: true } },
      ],
    })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res
      .status(200)
      .json({ totalPages: Math.ceil(total / limit), limitedFilteredListings });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
