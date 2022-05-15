import React from "react";
import {
  Navbar,
  Offcanvas,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavbarComp = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand href="/">Rentals</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Rentals
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* <Form className="d-flex ">
                <FormControl
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="me-2"
                  style={{ width: "500px" }}
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/auth" className="text-dark">
                  Register
                </Nav.Link>
                <Nav.Link
                  // as="button"
                  href="/listings/new"
                  className="btn btn-success text-light"
                >
                  Post ad
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
