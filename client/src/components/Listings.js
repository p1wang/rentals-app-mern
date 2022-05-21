import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import MessageForm from "./Forms/MessageForm";

import Listing from "./Listing";
import EditListingForm from "./Forms/EditListingForm";

const Listings = ({ listings, status }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

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
      <Row className="g-4">
        {listings.map((item) => (
          <Col key={item._id} xl={4} lg={6} md={12}>
            <Listing
              listing={item}
              status={status}
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
