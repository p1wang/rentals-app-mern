import React, { useEffect } from "react";
import { Accordion, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Listings from "../components/Listings";
import { getLikedListings, getListingsByUser } from "../redux/listingsSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { userListings, likedListings, status } = useSelector(
    (state) => state.listings
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getListingsByUser({ id: user?.result._id }));
    dispatch(getLikedListings({ id: user?.result._id }));
  }, [user]);

  return (
    <Container>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>My Listings</Accordion.Header>
          <Accordion.Body>
            <Listings listings={userListings} status={status} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Liked Listings</Accordion.Header>
          <Accordion.Body>
            <Listings listings={likedListings} status={status} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default DashboardPage;
