import React, { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteListing, likeListing } from "../redux/listingsSlice";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineStar } from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

import { Context } from "../App";

const Listing = ({ listing, status, setShowEditForm, setShowMessageForm }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const { currentListing, setCurrentListing, alertConfigs, setAlertConfigs } =
    useContext(Context);
  const dispatch = useDispatch();
  const isCreator = user?.result._id === listing?.creator;

  useEffect(() => {
    user
      ? setIsLikedByUser(listing.likes.includes(user?.result._id))
      : setIsLikedByUser(false);
  }, [listing.likes]);

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
      if (status === "fulfilled") {
        setIsLikedByUser(listing.likes.includes(user?.result._id));
      }
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
    window.scrollTo(0, 0);
    console.log(currentListing);
  };

  return (
    <>
      <Card>
        {isLikedByUser ? (
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
          <Card.Title>{listing.unitType}</Card.Title>
          <Card.Text
            style={{
              height: "10ch",
              overflow: "scroll",
            }}
          >
            {listing.description}
          </Card.Text>
        </Card.Body>

        <Card.Footer
          className={
            isCreator
              ? "d-flex justify-content-between"
              : "d-flex justify-content-end"
          }
        >
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
          <Link
            to={`listings/${listing._id}`}
            className="d-flex align-items-center btn btn-outline-success"
          >
            <BsBoxArrowRight size={24} />
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Listing;
