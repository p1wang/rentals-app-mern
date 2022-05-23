import React, { useState } from "react";
import { Button, Col, Container, Image, Row, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import UpdateUserForm from "./Forms/UpdateUserForm";

const Profile = () => {
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [target, setTarget] = useState("");

  const handleUpdate = (field) => {
    setShowEditUserForm(true);
    setTarget(field);
  };

  return (
    <Stack gap={2}>
      <UpdateUserForm
        showEditUserForm={showEditUserForm}
        setShowEditUserForm={setShowEditUserForm}
        target={target}
      />

      <div>
        <Image
          src={user?.result.profilePic}
          width="60px"
          roundedCircle
          alt="profile pic"
          className="mb-4"
          style={{ cursor: "pointer" }}
          onClick={() => handleUpdate("profilePic")}
        />
        <p className="fw-light">{user?.result.email}</p>
      </div>

      <div
        className="d-flex align-items-center justify-content-between"
        style={{ width: "200px" }}
      >
        <span>
          <h6>Name</h6>
          <p className="fw-light">{user?.result.name}</p>
        </span>

        <Button onClick={() => handleUpdate("name")}>Update</Button>
      </div>

      <div
        className="d-flex align-items-center justify-content-between"
        style={{ width: "200px" }}
      >
        <span>
          <h6>Password</h6>
          <p className="fw-light"> ..............</p>
        </span>

        <Button onClick={() => handleUpdate("password")}>Update</Button>
      </div>
    </Stack>
  );
};

export default Profile;
