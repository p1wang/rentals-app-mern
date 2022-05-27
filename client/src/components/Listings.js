import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import MessageForm from "./Forms/MessageForm";
import Listing from "./Listing";
import EditListingForm from "./Forms/UpdateListingForm";

const Listings = ({ listings }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { currentListing } = useSelector((state) => state.listings);
  const { user } = useSelector((state) => state.users);

  return (
    <>
      <MessageForm
        showMessageForm={showMessageForm}
        setShowMessageForm={setShowMessageForm}
        senderName={user?.result?.name}
        receiverId={currentListing?.creator}
      />
      <EditListingForm
        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
      />
      <Row className="g-4">
        {listings.length > 0 ? (
          listings.map((item) => (
            <Col key={item._id} lg={6} xl={4}>
              <Listing
                listing={item}
                setShowMessageForm={setShowMessageForm}
                setShowEditForm={setShowEditForm}
              />
            </Col>
          ))
        ) : (
          <span className="d-block text-center">No listings were found.</span>
        )}
      </Row>
    </>
  );
};

export default Listings;
