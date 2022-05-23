import React, { useEffect } from "react";
import { Accordion, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Listings from "../components/Listings";
import Loader from "../components/Loader";
import Profile from "../components/Profile";
import { getLikedListings, getListingsByUser } from "../redux/listingsSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { status, userListings, likedListings } = useSelector(
    (state) => state.listings
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLikedListings({ id: user?.result._id }));
    dispatch(getListingsByUser({ id: user?.result._id }));
  }, [user]); //when user state is ready

  return (
    <Container>
      {status === "pending" && <Loader />}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Profile</Accordion.Header>
          <Accordion.Body>
            <Profile />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Liked Listings</Accordion.Header>
          <Accordion.Body>
            <Listings listings={likedListings} status={status} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>My Listings</Accordion.Header>
          <Accordion.Body>
            <Listings listings={userListings} status={status} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default DashboardPage;
