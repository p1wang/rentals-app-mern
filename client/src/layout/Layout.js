import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import NavbarComp from "./NavbarComp";

const Layout = ({ children }) => {
  return (
    <>
      <NavbarComp />
      <Container className="mt-5 mb-5" style={{ minHeight: "100vh" }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
