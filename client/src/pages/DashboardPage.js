import React, { useEffect } from "react";
import { Accordion, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Listings from "../components/Listings";
import Loader from "../components/Loader";
import Profile from "../components/Profile";
import { setAlert } from "../redux/alertSlice";
import { getLikedListings, getListingsByUser } from "../redux/listingsSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { isLoading, userListings, likedListings } = useSelector(
    (state) => state.listings
  );

  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getLikedListings({ id: user?.result._id }))
      .unwrap()
      .then(() => {
        return;
      })
      .catch((rejectedValueOrSerializedError) => {
        dispatch(
          setAlert({
            variant: "danger",
            message: rejectedValueOrSerializedError,
          })
        );
      });
    dispatch(getListingsByUser({ id: user?.result._id }))
      .unwrap()
      .then(() => {
        return;
      })
      .catch((rejectedValueOrSerializedError) => {
        dispatch(
          setAlert({
            variant: "danger",
            message: rejectedValueOrSerializedError,
          })
        );
      });
  }, [user]); //when user state is ready

  return (
    <Container>
      {isLoading && <Loader />}
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
            <Listings listings={likedListings} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>My Listings</Accordion.Header>
          <Accordion.Body>
            <Listings listings={userListings} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default DashboardPage;
