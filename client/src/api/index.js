import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

// const API = axios.create({
//   baseURL: "https://dauntless-locker-mern-app.herokuapp.com",
// });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// listings
export const getListings = () => API.get("/listings");
export const getListing = (id) => API.get(`/listings/${id}`);
export const createListing = (newListing) => API.post("/listings", newListing);
export const deleteListing = (id) => API.delete(`/listings/${id}`);
export const updateListing = (id, updatedListing) =>
  API.patch(`/listings/${id}`, updatedListing);
export const likeListing = (id) => API.patch(`/listings/${id}/likes`)

//users
export const signUp = (formData) => API.post("/users/signup", formData);
export const signIn = (formData) => API.post("/users/signin", formData);
