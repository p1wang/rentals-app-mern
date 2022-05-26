import React from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { setAlert } from "../../redux/alertSlice";
import { sendMessage } from "../../redux/usersSlice";

const MessageForm = ({
  showMessageForm,
  setShowMessageForm,
  receiverId,
  senderName,
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useSelector((state) => state.users);

  const onSubmit = (formData) => {
    dispatch(
      sendMessage({
        id: receiverId,
        message: {
          ...formData,
          senderPfp: user?.result?.profilePic,
          senderName: senderName,
        },
      })
    )
      .unwrap()
      .then(() => {
        dispatch(
          setAlert({
            variant: "success",
            message: "Message successfully sent!",
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
    setShowMessageForm(false);

    reset();
  };

  return (
    <>
      <Modal
        centered
        show={showMessageForm}
        onHide={() => setShowMessageForm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send an inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="message-title">
                    <Form.Label>
                      Title <span className="required text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      {...register("messageTitle")}
                      required
                      type="text"
                      placeholder="Send a message ..."
                      rows={3}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="message-body">
                    <Form.Label>
                      Message <span className="required text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      {...register("messageBody")}
                      required
                      type="text"
                      placeholder="Send a message ..."
                      as="textarea"
                      rows={3}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="primary"
                type="submit"
                className="d-block ms-auto mt-3"
              >
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MessageForm;
