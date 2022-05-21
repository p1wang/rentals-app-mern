import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";

const FilterForm = ({ setShowFilterForm }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (formData) => {
    navigate({
      pathname: "/listings/search",
      search: `?${createSearchParams({
        ...formData,
        page: 1,
      })}`,
    });

    setShowFilterForm((showFilterForm) => !showFilterForm);

    reset();
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        margin: "auto",
        maxWidth: "500px",
      }}
    >
      {/* unit type */}
      <div className="row">
        <Form.Group className="mb-3 col" controlId="unitType">
          <Form.Label>Unit Type</Form.Label>
          <Form.Select
            {...register("unitType")}
            aria-label="Default select example"
            autoFocus
          >
            <option value="">Select</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="Townhouse">Townhouse</option>
          </Form.Select>
        </Form.Group>
        {/* bedrooms */}
        <Form.Group className="mb-3 col" controlId="Bedrooms">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Select
            {...register("bedrooms")}
            aria-label="Default select example"
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="5+">5+</option>
          </Form.Select>
        </Form.Group>
      </div>

      {/* bathrooms */}
      <div className="row">
        <Form.Group className="mb-3 col" controlId="bathrooms">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Select
            {...register("bathrooms")}
            aria-label="Default select example"
            autoFocus
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="2+">2+</option>
          </Form.Select>
        </Form.Group>
        {/* parkings */}
        <Form.Group className="mb-3 col" controlId="parkings">
          <Form.Label>Parkings</Form.Label>
          <Form.Select
            {...register("parkings")}
            aria-label="Default select example"
          >
            <option value="">Select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="2+">2+</option>
          </Form.Select>
        </Form.Group>
      </div>

      {/* agreement type */}
      <div className="row">
        <Form.Group className="mb-3 col" controlId="agreementType">
          <Form.Label>Agreement Type</Form.Label>
          <Form.Select
            {...register("agreementType")}
            aria-label="Default select example"
          >
            <option value="">Select</option>
            <option value="Month-to-month">Month-to-month</option>
            <option value="1 Year">1 Year</option>
          </Form.Select>
        </Form.Group>
      </div>

      {/* price */}
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>{"Max Price"}</Form.Label>
        <Form.Control
          {...register("price")}
          type="number"
          step="0.01"
          placeholder="eg. 800"
        />
      </Form.Group>

      {/* submit */}
      <Button variant="primary" type="submit" className="d-block ms-auto">
        {"Search"}
      </Button>
    </Form>
  );
};

export default FilterForm;
