import React from "react";
import { Button, Form, FormControl, Pagination } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const PaginationComp = ({ totalPages }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  // defaults page param to 1
  let currentPage = Number(
    searchParams.get("page") ? searchParams.get("page") : 1
  );
  const currentParams = Object.fromEntries([...searchParams]);
  const { register, handleSubmit, reset } = useForm();

  const handlePageSelect = (action, index) => {
    setSearchParams({
      ...currentParams,
      page: getNewpage(action, index),
    });
  };

  const onSubmit = (formData) => {
    handlePageSelect("current", formData.pageNumber);
  };

  const getNewpage = (action, index) => {
    switch (action) {
      case "first":
        return 1;
      case "prev":
        return currentPage > 1 ? currentPage - 1 : currentPage;
      case "current":
        return index;
      case "next":
        return currentPage < totalPages ? currentPage + 1 : currentPage;
      case "last":
        return totalPages;
      default:
        return currentPage;
    }
  };

  return (
    <>
      <Pagination className="d-flex justify-content-center mt-5">
        <Pagination.First href="#" onClick={() => handlePageSelect("first")} />
        <Pagination.Prev href="#" onClick={() => handlePageSelect("prev")} />

        <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            placeholder={currentPage}
            aria-label="current-page"
            {...register("pageNumber")}
            type="number"
            min="1"
            style={{
              width: "10ch",
              boxShadow: "none",
              borderRadius: 1,
              borderLeft: "none",
              borderRight: "none",
              appearance: "none",
            }}
          />
          <Button
            type="submit"
            style={{
              borderRadius: 1,
            }}
          >
            Go
          </Button>
        </Form>

        <Pagination.Next href="#" onClick={() => handlePageSelect("next")} />
        <Pagination.Last href="#" onClick={() => handlePageSelect("last")} />
      </Pagination>
    </>
  );
};

export default PaginationComp;
