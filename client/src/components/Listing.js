import React, { useContext } from "react";
import Moment from "react-moment";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteListing, getListing } from "../redux/listingsSlice";
import { useDispatch } from "react-redux";

import { Context } from "../App";

const Listing = ({ listing, status, setShowEditForm, setShowMessageForm }) => {
  const dispatch = useDispatch();

  const { currentListing, setCurrentListing, alertConfigs, setAlertConfigs } =
    useContext(Context);

  const handleMessage = () => {
    setShowMessageForm(true);
  };

  const handleDelete = () => {
    dispatch(deleteListing({ id: listing._id }));
    if (status === "fulfilled") {
      setAlertConfigs({
        showAlert: true,
        alertType: "success",
        alertMessage: "The listing was successfully deleted!",
      });
      setTimeout(() => {
        setAlertConfigs({ ...alertConfigs, showAlert: false });
      }, 2000);
    }
  };

  const handleUpdate = () => {
    setShowEditForm(true);
    setCurrentListing(listing);
    console.log(currentListing);
  };

  return (
    <>
      <Card>
        <Link to={`listings/${listing._id}`}>
          <Card.Img
            variant="top"
            src={listing.images[0]}
            style={{ height: "200px", objectFit: "cover" }}
          />
        </Link>
        <Card.Body>
          <small className="d-block text-muted text-end">
            <Moment fromNow>{listing.createdAt}</Moment>
          </small>
          <Card.Title>{listing.unitType}</Card.Title>
          <Card.Text
            style={{
              height: "10ch",
              overflow: "hidden",
            }}
          >
            {listing.description}
          </Card.Text>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-between">
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="outline-warning" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="outline-primary" onClick={handleMessage}>
            Message
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Listing;
