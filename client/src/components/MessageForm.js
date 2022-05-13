import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const MessageForm = ({ show, setShow }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    reset();
  };

  return (
    <>
      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send an inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex justify-content-between">
              {/* name */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Name <span className="required text-danger">*</span>
                </Form.Label>
                <Form.Control
                  {...register("name")}
                  required
                  type="text"
                  placeholder="Full Name"
                  autoFocus
                />
              </Form.Group>
              {/* phone number */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Phone <span className="required text-danger">*</span>
                </Form.Label>
                <Form.Control
                  {...register("phoneNumber")}
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Phone number"
                />
              </Form.Group>
            </div>
            {/* email */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Email <span className="required text-danger">*</span>
              </Form.Label>
              <Form.Control
                {...register("email")}
                required
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            {/* message */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Message <span className="required text-danger">*</span>
              </Form.Label>
              <Form.Control
                {...register("message")}
                required
                type="text"
                placeholder="Send a message ..."
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="d-block ms-auto">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MessageForm;
