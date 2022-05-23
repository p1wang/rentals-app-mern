import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { updateUser } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

import convertToBase64 from "../../utils/convertToBase64";

const UpdateUserForm = ({ showEditUserForm, setShowEditUserForm, target }) => {
  const { register: registerPfp, handleSubmit: handlePfpSubmit } = useForm();
  const { register: registerPass, handleSubmit: handlePassSubmit } = useForm();
  const { register: registerName, handleSubmit: handleNameSubmit } = useForm();
  const { user, status } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  const onNameSubmit = (formData) => {
    console.log(formData);
    dispatch(updateUser({ id: user.result._id, update: formData }));
    setShowEditUserForm(false);
  };

  const onPassSubmit = (formData) => {
    console.log(formData);
    dispatch(updateUser({ id: user.result._id, update: formData }));
    setShowEditUserForm(false);
  };

  const onPfpSubmit = (formData) => {
    console.log(formData);
    convertToBase64(formData.profilePic[0]).then((convertedImages) =>
      dispatch(
        updateUser({
          id: user.result._id,
          update: { ...formData, profilePic: convertedImages },
        })
      )
    );
    setShowEditUserForm(false);
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
              <>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Group className="mb-3" controlId="profile-picture">
                  <Form.Control
                    {...registerPfp(target)}
                    required
                    type="file"
                    multiple
                  />
                </Form.Group>
              </>

              <Button
                variant="primary"
                type="submit"
                className="d-block ms-auto"
              >
                Update
              </Button>
            </Form>
          )}

          <Form onSubmit={handleNameSubmit(onNameSubmit)}>
            {target === "name" && (
              <>
                <Form.Label>Name</Form.Label>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control
                    {...registerName(target)}
                    required
                    type="text"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="d-block ms-auto"
                >
                  Update
                </Button>
              </>
            )}
          </Form>

          <Form onSubmit={handlePassSubmit(onPassSubmit)}>
            {target === "password" && (
              <>
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
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateUserForm;
