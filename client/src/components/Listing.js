import React, { useContext, useState } from "react";
import Moment from "react-moment";
import { Card, Button, Offcanvas } from "react-bootstrap";
import { deleteListing, likeListing } from "../redux/listingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

import { Context } from "../App";
import ListingDetails from "./ListingDetails";
import { useMatch } from "react-router-dom";

const Listing = ({ listing, status, setShowEditForm, setShowMessageForm }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { setCurrentListing, alertConfigs, setAlertConfigs } =
    useContext(Context);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const isCreator = user?.result._id === listing?.creator;

  const handleClose = () => setShow(false);

  const handleLike = () => {
    if (!user) {
      setAlertConfigs({
        show: true,
        alertType: "warning",
        alertMessage: "To like a listing, please sign in.",
      });
      setTimeout(() => {
        setAlertConfigs({ ...alertConfigs, show: false });
      }, 2000);
    } else {
      dispatch(likeListing({ id: listing._id }));
    }
  };

  const handleMessage = () => {
    setShowMessageForm(true);
  };

  const handleDelete = () => {
    dispatch(deleteListing({ id: listing._id }));
    if (status === "fulfilled") {
      setAlertConfigs({
        show: true,
        alertType: "success",
        alertMessage: "The listing was successfully deleted!",
      });
      setTimeout(() => {
        setAlertConfigs({ ...alertConfigs, show: false });
      }, 2000);
    }
  };

  const handleUpdate = () => {
    setShowEditForm(true);
    setCurrentListing(listing);
  };

  const handleViewDetails = () => {
    setCurrentListing(listing);
    setShow(true);
  };

  return (
    <>
      <Card>
        {listing.likes.includes(user?.result._id) ? (
          <AiOutlineStar
            size={42}
            style={{
              position: "absolute",
              right: "0px",
              cursor: "pointer",
            }}
            className="text-warning"
            onClick={handleLike}
          />
        ) : (
          <AiOutlineStar
            size={42}
            style={{
              position: "absolute",
              right: "0px",
              cursor: "pointer",
            }}
            className="text-white"
            onClick={handleLike}
          />
        )}

        <Card.Img
          variant="top"
          src={listing.images[0]}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <small className="d-block text-muted text-end">
            <Moment fromNow>{listing.createdAt}</Moment>
          </small>
          <Card.Title className="fs-3">{`$${listing.price}`}</Card.Title>
          <div className="d-flex justify-content-around mt-2 fw-light fst-italic">
            <Card.Text>{listing.bedrooms} Bed</Card.Text>
            <Card.Text>{listing.bathrooms} Bath</Card.Text>
            <Card.Text>{listing.parkings} Parking</Card.Text>
          </div>
          <Card.Text>137 Galbraith Cres, Markham, ON L3S 1H8</Card.Text>
        </Card.Body>

        <Card.Footer className={"d-flex justify-content-between"}>
          {isCreator && (
            <>
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="outline-warning" onClick={handleUpdate}>
                Update
              </Button>
            </>
          )}

          <Button variant="outline-primary" onClick={handleMessage}>
            Message
          </Button>
          <Button onClick={handleViewDetails} variant="outline-primary">
            <BsBoxArrowRight size={24} />
          </Button>
          <Offcanvas
            show={show}
            onHide={handleClose}
            // scroll={true}
            // backdrop={false}
            style={{ minWidth: "60vw" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ListingDetails />
            </Offcanvas.Body>
          </Offcanvas>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Listing;
