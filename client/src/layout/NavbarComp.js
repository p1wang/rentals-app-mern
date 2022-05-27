import React from "react";
import {
  Navbar,
  Offcanvas,
  Container,
  Nav,
  Button,
  Dropdown,
  DropdownButton,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoMail } from "react-icons/go";
import { BsInboxFill } from "react-icons/bs";

import { setAlert } from "../redux/alertSlice";
import { setLogout } from "../redux/usersSlice";
import defaultPfp from "../assets/images/default-pfp.jpeg";

const NavbarComp = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth", { replace: true });
    dispatch(setLogout());
  };

  const handlePostAd = () => {
    if (user) {
      navigate("/listings/new");
    } else {
      navigate("/auth");
      dispatch(
        setAlert({
          variant: "warning",
          message: "To post listing please sign in.",
        })
      );
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="py-3">
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
              <Nav className="justify-content-end align-items-center flex-grow-1 gap-3">
                {user ? (
                  <>
                    <Navbar.Text>
                      Hi, <span>{user?.result.name}</span>
                    </Navbar.Text>

                    <Nav.Link href="/inbox" className="btn">
                      <BsInboxFill size={28} />
                    </Nav.Link>
                    <DropdownButton
                      id="settings-dropdown"
                      title={
                        <Image
                          src={
                            user?.result?.profilePic
                              ? user?.result?.profilePic
                              : defaultPfp
                          }
                          width="40px"
                          roundedCircle
                          alt="profile pic"
                        />
                      }
                      variant="outline-light"
                    >
                      <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                      <Dropdown.Item href="#" onClick={handleLogout}>
                        Log out
                      </Dropdown.Item>
                    </DropdownButton>
                  </>
                ) : (
                  <Nav.Link href="/auth" className="text-primary">
                    Signin
                  </Nav.Link>
                )}

                <Button onClick={handlePostAd}>Post ad</Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
