import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Alert } from "react-bootstrap";
import { createContext, useEffect, useState } from "react";
import decode from "jwt-decode";

import "./App.css";
import HomePage from "./pages/HomePage";

import DashboardPage from "./pages/DashboardPage";
import NewListingPage from "./pages/NewListingPage";
import AuthPage from "./pages/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUser } from "./redux/authSlice";
import Layout from "./layout/Layout";
import { resetListingsState } from "./redux/listingsSlice";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { status, alert } = useSelector((state) => state.listings);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  useEffect(() => {
    alert && setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }, [alert]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp < new Date().getTime() / 1000) {
        dispatch(setLogout());
        dispatch(resetListingsState());
        navigate("/", { replace: true });
      }
    }
  }, [location]);

  return (
    <>
      {showAlert && (
        <Alert variant={alert.variant} className="sticky-top text-center">
          {alert.message}
        </Alert>
      )}

      <Layout>
        {status === "pending" && <Loader />}
        <Routes>
          <Route path="/" element={<Navigate to={"/listings"} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/listings" element={<HomePage />} />
          <Route path="/listings/search" element={<HomePage />} />
          <Route path="/listings/new" element={<NewListingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
