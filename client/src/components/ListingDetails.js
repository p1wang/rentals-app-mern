import React from "react";
import { Carousel } from "react-bootstrap";

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
      {/* <Stack gap={2} className="col-md-5 mx-auto"></Stack> */}
    </>
  );
};

export default ListingDetails;
