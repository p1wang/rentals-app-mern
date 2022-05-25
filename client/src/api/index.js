import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

// const API = axios.create({
//   baseURL: "https://dauntless-locker-mern-app.herokuapp.com",
// });

// adds req.userID to the request
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// listings
export const getListings = (searchQuery) =>
  API.get(`/listings?page=${searchQuery.page}`);
export const getListingsByUser = (id) =>
  API.get(`/listings/userListings/${id}`);
export const getLikedListings = (id) =>
  API.get(`/listings/likedListings/${id}`);

export const getListingsByQuery = (searchQuery) =>
  API.get(`/listings/search`, { params: searchQuery });

export const getListing = (id) => API.get(`/listings/${id}`);
export const createListing = (newListing) => API.post("/listings", newListing);
export const deleteListing = (id) => API.delete(`/listings/${id}`);
export const updateListing = (id, update) =>
  API.patch(`/listings/${id}`, update);
export const likeListing = (id) => API.patch(`/listings/${id}/likes`);

//users
export const signUp = (formData) => API.post("/users/signup", formData);
export const signIn = (formData) => API.post("/users/signin", formData);
export const updateUser = (id, update) => API.patch(`/users/${id}`, update);
export const sendMessage = (id, message) =>
  API.patch(`/users/${id}/messages`, message);
