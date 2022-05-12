import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarComp from "./components/NavbarComp";
import Home from "./pages/HomePage";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AuthForm from "./components/AuthForm";
import Listings from "./components/Listings";

import { getListings } from "./redux/listingsSlice";
import ListingForm from "./components/ListingForm";

function App() {
  const dispatch = useDispatch();
  dispatch(getListings());

  return (
    <>
      <NavbarComp />
      <Container style={{ marginTop: "5vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/new" element={<ListingForm />} />
          <Route path="/auth" element={<AuthForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
