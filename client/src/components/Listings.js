import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MessageForm from "./Forms/MessageForm";
import { useDispatch, useSelector } from "react-redux";

import Listing from "./Listing";
import { getListings } from "../redux/listingsSlice";
import ListingSkeleton from "./ListingSkeleton";
import EditListingForm from "./Forms/EditListingForm";

const Listings = () => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const dispatch = useDispatch();
  const { listings, status } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(getListings());
  }, []);

  if (status === "pending") return <ListingSkeleton count={9} />;

  return (
    <>
      <MessageForm
        showMessageForm={showMessageForm}
        setShowMessageForm={setShowMessageForm}
      />
      <EditListingForm
        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
      />
      <Row className="gy-3">
        {listings.map((item) => (
          <Col key={item._id} lg={4} md={6}>
            <Listing
              listing={item}
              setShowMessageForm={setShowMessageForm}
              setShowEditForm={setShowEditForm}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Listings;
