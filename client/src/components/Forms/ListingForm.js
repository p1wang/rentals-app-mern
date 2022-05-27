import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { createListing, updateListing } from "../../redux/listingsSlice";
import convertToBase64 from "../../utils/convertToBase64";
import { setAlert } from "../../redux/alertSlice";

const ListingForm = ({ setShowEditForm, isUpdate }) => {
  const { currentListing } = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      unitType: isUpdate ? currentListing.unitType : "",
      bedrooms: isUpdate ? currentListing.bedrooms : "",
      bathrooms: isUpdate ? currentListing.bathrooms : "",
      parkings: isUpdate ? currentListing.parkings : "",
      agreementType: isUpdate ? currentListing.agreementType : "",
      postalCode: isUpdate ? currentListing.postalCode : "",
      price: isUpdate ? currentListing.price : "",
      images: [],
      creatorPfp: "",
      description: isUpdate ? currentListing.description : "",
    },
  });

  const onSubmit = (formData) => {
    convertToBase64(formData.images[0]).then((convertedImages) =>
      isUpdate
        ? dispatch(
            updateListing({
              id: currentListing._id,
              update: {
                ...formData,
                images: convertedImages,
                creatorPfp: user?.result?.profilePic
                  ? user?.result?.profilePic
                  : "",
              },
            })
          )
            .unwrap()
            .then(() => {
              dispatch(
                setAlert({
                  variant: "success",
                  message: "Listing successfully updated!",
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
        : dispatch(
            createListing({
              newListing: {
                ...formData,
                images: convertedImages,
                creatorPfp: user?.result?.profilePic
                  ? user?.result?.profilePic
                  : "",
              },
            })
          )
            .unwrap()
            .then(() => {
              dispatch(
                setAlert({
                  variant: "success",
                  message: "Listing successfully created!",
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

    isUpdate && setShowEditForm(false);

    // reset();
  };

  // ////////////////////////// Multiple /////////////////////////////////

  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.readAsDataURL(file);
  //   });
  // };

  // const onSubmit = (data) => {
  //   let convertedFiles = [];
  //   Object.values(data.images).forEach((file) => {
  //     convertToBase64(file).then((convertedFile) => {
  //       convertedFiles.push(convertedFile);
  //     });
  //   });

  //   dispatch(
  //     createListing({ newListing: { ...data, images: convertedFiles } })
  //   );

  //   reset();
  // };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        margin: "auto",
        maxWidth: "500px",
      }}
    >
      {/* unit type */}
      <Row>
        <Col>
          <Form.Group controlId="unitType">
            <Form.Label>
              Unit Type <span className="required text-danger">*</span>
            </Form.Label>
            <Form.Select
              {...register("unitType")}
              required
              aria-label="unit-select"
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
            <Form.Label>
              Bedrooms <span className="required text-danger">*</span>
            </Form.Label>
            <Form.Select
              {...register("bedrooms")}
              required
              aria-label="bedrooms-select"
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
        </Col>
      </Row>

      {/* bathrooms */}
      <Row className="mt-2">
        <Col>
          <Form.Group controlId="bathrooms">
            <Form.Label>
              Bathrooms <span className="required text-danger">*</span>
            </Form.Label>
            <Form.Select
              {...register("bathrooms")}
              required
              aria-label="bathrooms-select"
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
            <Form.Label>
              Parkings <span className="required text-danger">*</span>
            </Form.Label>
            <Form.Select
              {...register("parkings")}
              required
              aria-label="parkings-select"
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
            <Form.Label>
              Agreement Type <span className="required text-danger">*</span>
            </Form.Label>
            <Form.Select
              {...register("agreementType")}
              required
              aria-label="agreement-select"
            >
              <option value="">Select</option>
              <option value="Month-to-month">Month-to-month</option>
              <option value="1 Year">1 Year</option>
            </Form.Select>
          </Form.Group>
        </Col>
        {/* postal code */}
        <Col>
          <Form.Group controlId="postalCode">
            <Form.Label>
              Postal Code <span className="required text-danger">*</span>
            </Form.Label>
            <Form.Control
              {...register("postalCode")}
              required
              pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
              type="text"
              placeholder="eg. M5B 1B7"
            />
          </Form.Group>
        </Col>
      </Row>

      {/* price */}
      <Row className="mt-2">
        <Form.Group controlId="price">
          <Form.Label>
            Price <span className="required text-danger">*</span>
          </Form.Label>
          <Form.Control
            {...register("price")}
            required
            type="number"
            step="0.01"
            placeholder="eg. 800"
          />
        </Form.Group>
      </Row>

      {/* file upload */}
      <Row className="mt-2">
        <Form.Group controlId="formFileMultiple">
          <Form.Label>
            Upload Images <span className="required text-danger">*</span>
          </Form.Label>
          <Form.Control type="file" required multiple {...register("images")} />
        </Form.Group>
      </Row>
      {/* description */}
      <Row className="mt-2">
        <Form.Group controlId="description">
          <Form.Label>
            Description <span className="required text-danger">*</span>
          </Form.Label>
          <Form.Control
            {...register("description")}
            required
            as="textarea"
            rows={4}
            maxLength="280"
            placeholder="Describe a bit more about your unit ..."
          />
        </Form.Group>
      </Row>
      {/* submit */}
      <Button variant="primary" type="submit" className="d-block ms-auto mt-3">
        {isUpdate ? "Update" : "Submit"}
      </Button>
    </Form>
  );
};

export default ListingForm;
