import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../redux/usersSlice";
import convertToBase64 from "../../utils/convertToBase64";
import { setAlert } from "../../redux/alertSlice";

const UpdateUserForm = ({ showEditUserForm, setShowEditUserForm, target }) => {
  const dispatch = useDispatch();

  const {
    register: registerPfp,
    handleSubmit: handlePfpSubmit,
    reset: resetPfp,
  } = useForm();

  const {
    register: registerPass,
    handleSubmit: handlePassSubmit,
    reset: resetPass,
  } = useForm();

  const {
    register: registerName,
    handleSubmit: handleNameSubmit,
    reset: resetName,
  } = useForm();

  const onNameSubmit = (formData) => {
    dispatch(updateUser({ update: formData }))
      .unwrap()
      .then(() => {
        dispatch(
          setAlert({
            variant: "success",
            message: "Name successfully updated!",
          })
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        dispatch(
          setAlert({
            variant: "danger",
            message: rejectedValueOrSerializedError,
          })
        );
      });
    setShowEditUserForm(false);
    resetName();
  };

  const onPassSubmit = (formData) => {
    dispatch(updateUser({ update: formData }))
      .unwrap()
      .then(() => {
        dispatch(
          setAlert({
            variant: "success",
            message: "Password successfully updated!",
          })
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        dispatch(
          setAlert({
            variant: "danger",
            message: rejectedValueOrSerializedError,
          })
        );
      });
    setShowEditUserForm(false);
    resetPass();
  };

  const onPfpSubmit = (formData) => {
    console.log(formData);
    convertToBase64(formData.profilePic[0]).then((convertedImages) =>
      dispatch(
        updateUser({
          update: { ...formData, profilePic: convertedImages },
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            setAlert({
              variant: "success",
              message: "Profile picture updated successfully!",
            })
          );
        })
        .catch((rejectedValueOrSerializedError) => {
          dispatch(
            setAlert({
              variant: "danger",
              message: rejectedValueOrSerializedError,
            })
          );
        })
    );
    setShowEditUserForm(false);
    resetPfp();
  };

  return (
    <>
      <Modal
        centered
        show={showEditUserForm}
        onHide={() => setShowEditUserForm(false)}
        size="sm"
      >
        <Modal.Body>
          {target === "profilePic" && (
            <Form onSubmit={handlePfpSubmit(onPfpSubmit)}>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Group className="mb-3" controlId="profile-picture">
                <Form.Control
                  {...registerPfp(target)}
                  required
                  type="file"
                  multiple
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="d-block ms-auto"
              >
                Update
              </Button>
            </Form>
          )}

          {target === "name" && (
            <Form onSubmit={handleNameSubmit(onNameSubmit)}>
              <Form.Label>Name</Form.Label>
              <Form.Group className="mb-3" controlId="name">
                <Form.Control {...registerName(target)} required type="text" />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="d-block ms-auto"
              >
                Update
              </Button>
            </Form>
          )}

          {target === "password" && (
            <Form onSubmit={handlePassSubmit(onPassSubmit)}>
              <Form.Label>Password</Form.Label>
              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  {...registerPass(target)}
                  required
                  type="text"
                  minLength="6"
                  maxLength="20"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="d-block ms-auto"
              >
                Update
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateUserForm;
