import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Form
      style={{ margin: "auto", maxWidth: "350px", marginTop: "200px" }}
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
        <Form.Control
          {...register("password")}
          required
          minLength="6"
          maxLength="20"
          type="password"
          placeholder="Password"
        />
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
            onClick={(e) => {
              setIsSignUp(false);
            }}
          >
            Already have an account?
          </Button>
        ) : (
          <Button
            variant="light"
            className="shadow-none m-0 p-0 border-0 bg-transparent "
            onClick={(e) => {
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