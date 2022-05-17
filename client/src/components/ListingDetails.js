import React, { useEffect } from "react";
import { Carousel, Col, Container, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getListing } from "../redux/listingsSlice";

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
  const { listing } = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(getListing({ id: params.id }));
  }, []);

  console.log(listing);

  return (
    <>
      <Carousel>
        {images.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                height: "45vh",
              }}
              src={item.url}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="border border-warning  mt-5">
        <Row>
          <Col>
            <p className="bg-light border fs-2">{`$${listing.price}`}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="bg-light border">{listing.postalCode}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="bg-light border">{listing.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="bg-light border">{listing.unitType}</p>
          </Col>
          <Col>
            <p className="bg-light border">{listing.agreementType}</p>
          </Col>
          <Col>
            <p className="bg-light border">{listing.bedrooms}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListingDetails;
