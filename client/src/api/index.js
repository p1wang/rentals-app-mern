import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

// const API = axios.create({
//   baseURL: "https://dauntless-locker-mern-app.herokuapp.com",
// });

export const getListings = () => API.get("/listings");
export const getListing = (id) => API.get(`/listings/${id}`);
export const createListing = (newListing) => API.post("/listings", newListing);
export const deleteListing = (id) => API.delete(`/listings/${id}`);
export const updateListing = (id, updatedListing) =>
  API.patch(`/listings/${id}`, updatedListing);
