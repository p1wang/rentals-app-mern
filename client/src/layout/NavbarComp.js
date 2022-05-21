import React from "react";
import {
  Navbar,
  Offcanvas,
  Container,
  Nav,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useShowAlert from "../hooks/useShowAlert";
import { setLogout } from "../redux/authSlice";
import { resetListingsState } from "../redux/listingsSlice";

const NavbarComp = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAlert = useShowAlert();

  const handleLogout = () => {
    navigate("/auth", { replace: true });
    dispatch(setLogout());
    dispatch(resetListingsState());
  };

  const handlePostAd = () => {
    if (user) {
      navigate("/listings/new");
    } else {
      navigate("/auth");
      showAlert("warning", "Please sign in to post your listings.");
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3 py-3">
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
              <Nav className="justify-content-end flex-grow-1 gap-3">
                {user ? (
                  <>
                    <Navbar.Text>
                      Hi, <span>{user?.result.name}</span>
                    </Navbar.Text>
                    <DropdownButton id="dropdown-basic-button" title="Settings">
                      <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                      <Dropdown.Item href="#" onClick={handleLogout}>
                        Log out
                      </Dropdown.Item>
                    </DropdownButton>
                  </>
                ) : (
                  <Nav.Link href="/auth" className="text-dark">
                    Signin
                  </Nav.Link>
                )}

                <Button variant="success" onClick={handlePostAd}>
                  Post ad
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
