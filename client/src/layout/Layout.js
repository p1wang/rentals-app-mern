import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import NavbarComp from "../components/NavbarComp";

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
