import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { createContext, useEffect, useState } from "react";
import decode from "jwt-decode";

import "./App.css";
import HomePage from "./pages/HomePage";
import Listings from "./components/Listings";

import DashboardPage from "./pages/DashboardPage";
import NewListingPage from "./pages/NewListingPage";
import AuthPage from "./pages/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUser } from "./redux/authSlice";
import Layout from "./layout/Layout";
import ListingSkeleton from "./components/ListingSkeleton";

export const Context = createContext();

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { spinnerStatus } = useSelector((state) => state.listings);
  const [currentListing, setCurrentListing] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
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
          setShowSpinner,
        }}
      >
        <Layout>
          {spinnerStatus === "pending" && <ListingSkeleton count={9} />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/listings" element={<HomePage />} />
            <Route path="/listings/new" element={<NewListingPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Layout>
      </Context.Provider>
    </>
  );
}

export default App;
