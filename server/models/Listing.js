import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
  unitType: String,
  bedrooms: String,
  agreementType: String,
  postalCode: String,
  price: String,
  description: String,
  images: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
