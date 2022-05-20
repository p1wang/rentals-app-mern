import React, { useContext } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

import { Context } from "../App";

const images = [
  {
    id: 1,
    url: "https://images7.alphacoders.com/341/341714.jpg",
  },
  {
    id: 2,
    url: "https://images2.alphacoders.com/643/64302.jpg",
  },
  {
    id: 3,
    url: "https://images6.alphacoders.com/872/872806.jpg",
  },
  {
    id: 4,
    url: "https://images2.alphacoders.com/695/695625.jpg",
  },
  {
    id: 5,
    url: "https://images7.alphacoders.com/341/341475.jpg",
  },
  {
    id: 6,
    url: "https://images2.alphacoders.com/849/849252.jpg",
  },
];

const ListingDetails = () => {
  const { currentListing } = useContext(Context);
  console.log(currentListing);

  return (
    <>
      <Carousel>
        {currentListing.images.map((image) => (
          <Carousel.Item key={image}>
            <img
              className="d-block w-100"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                height: "45vh",
              }}
              src={image}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="mt-5">
        <Row className="m-2">
          <Col>
            <p className="fs-2">{`$${currentListing.price}`}</p>
          </Col>
        </Row>
        <Row className="m-2 border-bottom">
          <Col>
            <span className="fs-5 ">Postal Code:</span>
            <p className="fw-light">{currentListing.postalCode}</p>
          </Col>
        </Row>
        <Row className="m-2">
          <Col>
            <span className="fs-5 ">Unit Type:</span>
            <p className="fw-light">{currentListing.unitType}</p>
          </Col>
          <Col>
            <span className="fs-5 ">Agreement Type:</span>
            <p className="fw-light">{currentListing.agreementType}</p>
          </Col>
        </Row>
        <Row className="m-2 border-bottom">
          <Col>
            <span className="fs-5 ">Unit Specs:</span>
            <div className="d-flex justify-content-around">
              <p className="fw-light">{`${currentListing.bedrooms} Bedroom`}</p>
              <p className="fw-light">{`${currentListing.bathrooms} Bathroom`}</p>
              <p className="fw-light">{`${currentListing.parkings} Parking`}</p>
            </div>
          </Col>
        </Row>
        <Row className="m-2 ">
          <Col>
            <span className="fs-5 ">Description:</span>
            <p className="fw-light">{currentListing.description}</p>
          </Col>
        </Row>
        <Row className="m-2 border-bottom">
          <Col>
            <span className="fs-5 ">Contact:</span>
            <p className="fw-light">{currentListing.creatorEmail}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListingDetails;
