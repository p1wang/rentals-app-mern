import React, { useContext, useEffect, useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { signIn, signUp } from "../../redux/authSlice";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const AuthForm = () => {
  const { user, status } = useSelector((state) => ({ ...state.auth }));
  const { alertConfigs, setAlertConfigs } = useContext(Context);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (user && status === "fulfilled") {
      setAlertConfigs({
        show: true,
        alertType: "success",
        alertMessage: `Welcome, ${user?.result.name}`,
      });

      setTimeout(() => {
        setAlertConfigs({ ...alertConfigs, show: false });
      }, 2000);
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
      : dispatch(signIn({ formData, navigate }));
    reset();
  };

  return (
    <Form
      style={{ margin: "auto", maxWidth: "350px" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        {/* email */}
        <Form.Control
          {...register("email")}
          required
          type="email"
          autoFocus
          placeholder="Enter email"
        />
      </Form.Group>
      {isSignUp && (
        <div className="d-flex">
          {/* first name */}
          <Form.Group className="mb-3 me-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              {...register("firstName")}
              required
              type="text"
              placeholder="First Name"
            />
          </Form.Group>
          {/* last name */}
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              {...register("lastName")}
              required
              type="text"
              placeholder="Last Name"
            />
          </Form.Group>
        </div>
      )}
      {/* password */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup className="mb-3">
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
      {isSignUp && (
        // confirm password
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
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
          <p className="text-danger">
            {errors.confirmPassword?.type === "validate" &&
              errors.confirmPassword.message}
          </p>
        </Form.Group>
      )}

      <div className="d-flex justify-content-between">
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
  );
};

export default AuthForm;
