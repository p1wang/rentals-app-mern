import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MessageForm from "./MessageForm";
import { useDispatch, useSelector } from "react-redux";
import Listing from "./Listing";
import { getListings } from "../redux/listingsSlice";

const Listings = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { listings } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(getListings);
  }, [dispatch]);

  return (
    <>
      <MessageForm show={show} setShow={setShow} />
      <Row className="gy-3">
        {listings.map((item) => (
          <Col key={item._id} lg={4} md={6}>
            <Listing listing={item} setShow={setShow} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Listings;
