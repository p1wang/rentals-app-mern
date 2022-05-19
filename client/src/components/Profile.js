import React from "react";
import { Stack } from "react-bootstrap";

const Profile = ({ user }) => {
  return (
    <Stack gap={2}>
      <span>
        <h6>Name:</h6>
        <p className="fw-light">{user?.result.name}</p>
      </span>

      <span>
        <h6>Email:</h6>
        <p className="fw-light">{user?.result.email}</p>
      </span>
    </Stack>
  );
};

export default Profile;
