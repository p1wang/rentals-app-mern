import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import NewListingPage from "./pages/NewListingPage";
import AuthPage from "./pages/AuthPage";
import { setLogout, setUser } from "./redux/usersSlice";
import Layout from "./layout/Layout";
import Loader from "./components/Loader";
import InboxPage from "./pages/InboxPage";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { isLoading: listingsIsLoading } = useSelector(
    (state) => state.listings
  );
  const { isLoading: messagesIsLoading } = useSelector(
    (state) => state.messages
  );
  const { alert } = useSelector((state) => state.alert);
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
    // check token expiration
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
      {showAlert && (
        <Alert variant={alert.variant} className="sticky-top text-center">
          {alert.message}
        </Alert>
      )}

      <Layout>
        {(listingsIsLoading || messagesIsLoading) && <Loader />}
        <Routes>
          <Route path="/" element={<Navigate to={"/listings"} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inbox" element={<InboxPage />} />
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
