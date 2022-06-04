import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, Row, Container, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";

import { signIn, signUp } from "../../redux/usersSlice";
import { setAlert } from "../../redux/alertSlice";

const AuthForm = () => {
  const { user } = useSelector((state) => state.users);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      isSignUp
        ? dispatch(
            setAlert({
              variant: "success",
              message: `Welcome ${user?.result?.name}!`,
            })
          )
        : dispatch(
            setAlert({
              variant: "success",
              message: `Welcome back ${user?.result?.name}!`,
            })
          );
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    isSignUp
      ? dispatch(signUp({ formData, navigate }))
          .unwrap()
          .then(() => {
            return;
          })
          .catch((rejectedValueOrSerializedError) => {
            dispatch(
              setAlert({
                variant: "danger",
                message: rejectedValueOrSerializedError,
              })
            );
          })
      : dispatch(signIn({ formData, navigate }))
          .unwrap()
          .then(() => {
            return;
          })
          .catch((rejectedValueOrSerializedError) => {
            dispatch(
              setAlert({
                variant: "danger",
                message: rejectedValueOrSerializedError,
              })
            );
          });

    reset();
  };

  return (
    <Container>
      <Form
        style={{ margin: "auto", maxWidth: "350px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Email address <span className="required text-danger">*</span>
            </Form.Label>
            {/* email */}
            <Form.Control
              {...register("email")}
              required
              type="email"
              autoFocus
              placeholder="Enter email"
            />
          </Form.Group>
        </Row>
        {isSignUp && (
          <Row className="mt-2">
            {/* first name */}
            <Col>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>
                  First Name <span className="required text-danger">*</span>
                </Form.Label>
                <Form.Control
                  {...register("firstName")}
                  required
                  type="text"
                  placeholder="First Name"
                />
              </Form.Group>
            </Col>
            {/* last name */}
            <Col>
              <Form.Group controlId="formBasicLastName">
                <Form.Label>
                  Last Name <span className="required text-danger">*</span>
                </Form.Label>
                <Form.Control
                  {...register("lastName")}
                  required
                  type="text"
                  placeholder="Last Name"
                />
              </Form.Group>
            </Col>
          </Row>
        )}
        {/* password */}
        <Row className="mt-2">
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              Password <span className="required text-danger">*</span>
            </Form.Label>
            <InputGroup>
              <Form.Control
                {...register("password")}
                required
                minLength="6"
                maxLength="20"
                type={showPass ? "text" : "password"}
                placeholder="Password"
              />
              <InputGroup.Text
                id="toggle-password-visibility"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <BsEyeSlash size={24} /> : <BsEye size={24} />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Row>

        {isSignUp && (
          // confirm password
          <Row className="mt-2">
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>
                Confirm Password <span className="required text-danger">*</span>
              </Form.Label>
              <Form.Control
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                required
                minLength="6"
                maxLength="20"
                type="password"
                placeholder="Confirm password"
              />
              {errors.confirmPassword?.type === "validate" && (
                <p className="text-danger">{errors.confirmPassword.message} </p>
              )}
            </Form.Group>
          </Row>
        )}

        <div className="d-flex justify-content-between mt-3">
          {isSignUp ? (
            <Button
              variant="light"
              className="shadow-none m-0 p-0 border-0 bg-transparent "
              onClick={() => {
                setIsSignUp(false);
              }}
            >
              Already have an account?
            </Button>
          ) : (
            <Button
              variant="light"
              className="shadow-none m-0 p-0 border-0 bg-transparent "
              onClick={() => {
                setIsSignUp(true);
              }}
            >
              Don't have an account yet?
            </Button>
          )}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AuthForm;
