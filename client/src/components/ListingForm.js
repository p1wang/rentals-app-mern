import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { createListing } from "../redux/listingsSlice";

const ListingForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  // const [base64Images, setBase64Images] = useState();

  // const convertToBase64 = (images) => {
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setBase64Images(reader.result.toString());
  //   };

  //   reader.readAsDataURL(images);
  // };

  // const onSubmit = (data) => {
  //   convertToBase64(data.images[0]);
  //   dispatch(createListing({ ...data, images: base64Images }));
  // };

  const convertToBase64 = (images) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result.toString());
      };

      reader.readAsDataURL(images);
    });
  };

  const onSubmit = async (data) => {
    dispatch(
      createListing({ ...data, images: await convertToBase64(data.images[0]) })
    );
    reset();
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      style={{ margin: "auto", maxWidth: "500px", marginTop: "200px" }}
    >
      {/* unit type */}
      <div className="row">
        <Form.Group className="mb-3 col" controlId="unitType">
          <Form.Label>Unit Type</Form.Label>
          <Form.Select
            {...register("unitType")}
            required
            aria-label="Default select example"
            autoFocus
          >
            <option value="">Select</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="house">House</option>
            <option value="townhouse">Townhouse</option>
          </Form.Select>
        </Form.Group>
        {/* bedrooms */}
        <Form.Group className="mb-3 col" controlId="Bedrooms">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Select
            {...register("bedrooms")}
            required
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
      {/* agreement type */}
      <div className="row">
        <Form.Group className="mb-3 col" controlId="agreementType">
          <Form.Label>Agreement Type</Form.Label>
          <Form.Select
            {...register("agreementType")}
            required
            aria-label="Default select example"
          >
            <option value="">Select</option>
            <option value="monthToMonth">Month-to-month</option>
            <option value="oneYear">1 Year</option>
          </Form.Select>
        </Form.Group>
        {/* postal code */}
        <Form.Group className="mb-3 col" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            {...register("postalCode")}
            required
            pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
            type="text"
            placeholder="eg. M5B 1B7"
          />
        </Form.Group>
      </div>

      {/* price */}
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          {...register("price")}
          required
          type="number"
          step="0.01"
          placeholder="eg. 800"
        />
      </Form.Group>
      {/* file upload */}
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control type="file" multiple {...register("images")} />
      </Form.Group>
      {/* description */}
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          {...register("description")}
          required
          as="textarea"
          rows={4}
          placeholder="Describe a bit more about your unit ..."
        />
      </Form.Group>
      {/* submit */}
      <Button variant="primary" type="submit" className="d-block ms-auto">
        Submit
      </Button>
    </Form>
  );
};

export default ListingForm;
