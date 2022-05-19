import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Context } from "../../App";
import { createListing, updateListing } from "../../redux/listingsSlice";

const ListingForm = ({ setShowEditForm, isUpdate }) => {
  const { currentListing, alertConfigs, setAlertConfigs } = useContext(Context);
  const { status } = useSelector((state) => state.listings);
  const dispatch = useDispatch();
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
      description: isUpdate ? currentListing.description : "",
    },
  });

  /////////////////////////////////////////////////////////////////
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = (formData) => {
    convertToBase64(formData.images[0]).then((convertedImages) =>
      isUpdate
        ? dispatch(
            updateListing({
              id: currentListing._id,
              updatedListing: { ...formData, images: convertedImages },
            })
          )
        : dispatch(
            createListing({
              newListing: { ...formData, images: convertedImages },
            })
          )
    );

    isUpdate && setShowEditForm(false);

    if (isUpdate && status === "fulfilled") {
      setAlertConfigs({
        show: true,
        alertType: "success",
        alertMessage: "The listing was successfully updated!",
      });
      setTimeout(() => {
        setAlertConfigs({ ...alertConfigs, show: false });
      }, 2000);
    } else if (status === "fulfilled") {
      setAlertConfigs({
        show: true,
        alertType: "success",
        alertMessage: "The listing was successfully created!",
      });
      setTimeout(() => {
        setAlertConfigs({ ...alertConfigs, show: false });
      }, 2000);
    }
    reset();
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

      {/* bathrooms */}
      <div className="row">
        <Form.Group className="mb-3 col" controlId="bathrooms">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Select
            {...register("bathrooms")}
            required
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
            required
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
            required
            aria-label="Default select example"
          >
            <option value="">Select</option>
            <option value="Month-to-month">Month-to-month</option>
            <option value="1 Year">1 Year</option>
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
        <Form.Control type="file" required multiple {...register("images")} />
      </Form.Group>
      {/* description */}
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          {...register("description")}
          required
          as="textarea"
          rows={4}
          maxLength="280"
          placeholder="Describe a bit more about your unit ..."
        />
      </Form.Group>
      {/* submit */}
      <Button variant="primary" type="submit" className="d-block ms-auto">
        {isUpdate ? "Update" : "Submit"}
      </Button>
    </Form>
  );
};

export default ListingForm;
