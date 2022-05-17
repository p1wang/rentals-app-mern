import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";
import { createContext, useEffect, useState } from "react";
import decode from "jwt-decode";

import "./App.css";
import NavbarComp from "./components/NavbarComp";
import HomePage from "./pages/HomePage";
import Listings from "./components/Listings";
import ListingDetails from "./components/ListingDetails";

import DashboardPage from "./pages/DashboardPage";
import NewListingPage from "./pages/NewListingPage";
import AuthPage from "./pages/AuthPage";
import { useDispatch } from "react-redux";
import { setLogout, setUser } from "./redux/authSlice";

export const Context = createContext();

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentListing, setCurrentListing] = useState("");
  const [alertConfigs, setAlertConfigs] = useState({
    show: false,
    alertType: "",
    alertMessage: "",
  });

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      console.log(decodedToken);

      if (decodedToken.exp < new Date().getTime() / 1000) {
        dispatch(setLogout());
        navigate("/", { replace: true });
      }
    }
  }, [location]);

  return (
    <>
      {alertConfigs.show && (
        <Alert
          variant={alertConfigs.alertType}
          className="sticky-top text-center"
        >
          {alertConfigs.alertMessage}
        </Alert>
      )}
      <Context.Provider
        value={{
          currentListing,
          setCurrentListing,
          alertConfigs,
          setAlertConfigs,
        }}
      >
        <NavbarComp />
        <Container className="mt-5 mb-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            <Route path="/listings/new" element={<NewListingPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Container>
      </Context.Provider>
    </>
  );
}

export default App;
