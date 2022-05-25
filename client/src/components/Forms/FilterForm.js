import React from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
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
    <Container>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          margin: "auto",
          maxWidth: "500px",
        }}
      >
        {/* unit type */}

        <Row className="mt-2">
          <Col>
            <Form.Group controlId="unitType">
              <Form.Label>Unit Type</Form.Label>
              <Form.Select
                {...register("unitType")}
                aria-label="unit-type"
                autoFocus
              >
                <option value="">Select</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Townhouse">Townhouse</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {/* bedrooms */}
          <Col>
            <Form.Group controlId="Bedrooms">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Select {...register("bedrooms")} aria-label="bedrooms">
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="5+">5+</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* bathrooms */}
        <Row className="mt-2">
          <Col>
            <Form.Group controlId="bathrooms">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Select
                {...register("bathrooms")}
                aria-label="bathrooms"
                autoFocus
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2+">2+</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {/* parkings */}
          <Col>
            <Form.Group controlId="parkings">
              <Form.Label>Parkings</Form.Label>
              <Form.Select
                {...register("parkings")}
                aria-label="parkings"
              >
                <option value="">Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2+">2+</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* agreement type */}
        <Row className="mt-2">
          <Col>
            <Form.Group controlId="agreementType">
              <Form.Label>Agreement Type</Form.Label>
              <Form.Select
                {...register("agreementType")}
                aria-label="agreement-type"
              >
                <option value="">Select</option>
                <option value="Month-to-month">Month-to-month</option>
                <option value="1 Year">1 Year</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* price */}
          <Col>
            <Form.Group controlId="price">
              <Form.Label>{"Max Price"}</Form.Label>
              <Form.Control
                {...register("price")}
                type="number"
                step="0.01"
                placeholder="eg. 800"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* submit */}
        <Button
          variant="primary"
          type="submit"
          className="d-block ms-auto mt-3"
        >
          {"Search"}
        </Button>
      </Form>
    </Container>
  );
};

export default FilterForm;
