import React from "react";
import { Modal } from "react-bootstrap";

import ListingForm from "./ListingForm";

const UpdateListingForm = ({ showEditForm, setShowEditForm }) => {
  return (
    <Modal centered show={showEditForm} onHide={() => setShowEditForm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListingForm isUpdate={true} setShowEditForm={setShowEditForm} />
      </Modal.Body>
    </Modal>
  );
};

export default UpdateListingForm;
