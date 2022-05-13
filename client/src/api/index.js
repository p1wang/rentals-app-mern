import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

// const API = axios.create({
//   baseURL: "https://dauntless-locker-mern-app.herokuapp.com",
// });

export const getListings = () => API.get("/listings");
export const createListing = (newListing) => API.post("/listings", newListing);
