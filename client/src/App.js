import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { createContext, useEffect, useState } from "react";

import "./App.css";
import NavbarComp from "./components/NavbarComp";
import HomePage from "./pages/HomePage";
import Listings from "./components/Listings";
import ListingDetails from "./components/ListingDetails";

import DashboardPage from "./pages/DashboardPage";
import NewListingPage from "./pages/NewListingPage";
import AuthPage from "./pages/AuthPage";

export const Context = createContext();

function App() {
  const [currentListing, setCurrentListing] = useState("");
  const [alertConfigs, setAlertConfigs] = useState({
    showAlert: false,
    alertType: "",
    alertMessage: "",
  });

  return (
    <>
      {alertConfigs.showAlert && (
        <div
          className={`alert alert-${alertConfigs.alertType} text-center`}
          role="alert"
        >
          {alertConfigs.alertMessage}
        </div>
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
        <Container style={{ marginTop: "5vh" }}>
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
