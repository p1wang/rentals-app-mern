import React, { useContext } from "react";
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
import { Context } from "../App";
import { setLogout } from "../redux/authSlice";

const NavbarComp = () => {
  const { alertConfigs, setAlertConfigs } = useContext(Context);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/auth", { replace: true });
  };

  const handlePostAd = () => {
    if (user) {
      navigate("/listings/new");
    } else {
      setAlertConfigs({
        show: true,
        alertType: "warning",
        alertMessage: "Please sign in to post your listings.",
      });
      setTimeout(() => {
        setAlertConfigs({ ...alertConfigs, show: false });
      }, 2000);
      navigate("/auth");
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
                    {/* <Button onClick={handleLogout} variant="primary">
                      Logout
                    </Button> */}
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
