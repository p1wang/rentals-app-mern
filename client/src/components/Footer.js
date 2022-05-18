import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="text-center bg-light">
      <Container
        style={{ minHeight: "80px" }}
        className="text-dark d-flex align-items-center justify-content-center"
      >
        &copy; Rentals
      </Container>
    </div>
  );
};

export default Footer;
