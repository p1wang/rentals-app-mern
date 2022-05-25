import React from "react";

import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Spinner animation="grow" variant="success" className="m-1" />
      <Spinner animation="grow" variant="warning" className="m-1" />
      <Spinner animation="grow" variant="info" className="m-1" />
    </div>
  );
};

export default Loader;
