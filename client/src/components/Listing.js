import React from "react";
import Moment from "react-moment";
import { Card, Button } from "react-bootstrap";

const Listing = ({ listing, setShow }) => {
  const handleOnClick = () => {
    setShow(true);
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={listing.images}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <small className="d-block text-muted text-end">
          <Moment fromNow>{listing.createdAt}</Moment>
        </small>
        <Card.Title>{listing.unitType}</Card.Title>
        <Card.Text>{listing.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-end">
        <Button onClick={handleOnClick}>Message</Button>
      </Card.Footer>
    </Card>
  );
};

export default Listing;
