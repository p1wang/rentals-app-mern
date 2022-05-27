import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Card, Button, Offcanvas } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";
import { useMatch, useNavigate } from "react-router-dom";
import ListingDetails from "./ListingDetails";
import { setAlert } from "../redux/alertSlice";
import {
  deleteListing,
  likeListing,
  setCurrentListing,
} from "../redux/listingsSlice";

const Listing = ({ listing, setShowEditForm, setShowMessageForm }) => {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const isCreator = user?.result._id === listing?.creator;
  const navigate = useNavigate();

  const match = useMatch("/listings");

  const handleClose = () => setShow(false);

  const handleLike = () => {
    if (!user) {
      dispatch(
        setAlert({
          variant: "warning",
          message: "Please sign in to like listings.",
        })
      );
    } else {
      dispatch(likeListing({ id: listing._id }))
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
    }
  };

  const handleMessage = () => {
    dispatch(setCurrentListing(listing));
    if (!user) {
      dispatch(
        setAlert({
          variant: "warning",
          message: "Please sign in to send message.",
        })
      );
    } else {
      setShowMessageForm(true);
    }
  };

  const handleDelete = () => {
    dispatch(deleteListing({ id: listing._id }))
      .unwrap()
      .then(() => {
        dispatch(
          setAlert({
            variant: "success",
            message: "Listing successfully deleted!",
          })
        );
        // match && navigate(0);
      })
      .catch((rejectedValueOrSerializedError) => {
        dispatch(
          setAlert({
            variant: "danger",
            message: rejectedValueOrSerializedError,
          })
        );
      });
  };

  const handleUpdate = () => {
    dispatch(setCurrentListing(listing));
    setShowEditForm(true);
  };

  const handleViewDetails = () => {
    dispatch(setCurrentListing(listing));
    setShow(true);
  };

  return (
    <>
      <Card>
        {listing.likes.includes(user?.result._id) ? (
          <FaRegHeart
            size={36}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              cursor: "pointer",
            }}
            className="text-warning"
            onClick={handleLike}
          />
        ) : (
          <FaRegHeart
            size={36}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
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

          {!isCreator && (
            <Button variant="outline-primary" onClick={handleMessage}>
              Message
            </Button>
          )}

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
              <Offcanvas.Title></Offcanvas.Title>
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
