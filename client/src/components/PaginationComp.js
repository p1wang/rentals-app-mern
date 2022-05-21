import React from "react";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const PaginationComp = ({ totalPages }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  // defaults page param to 1
  let currentPage = Number(
    searchParams.get("page") ? searchParams.get("page") : 1
  );
  const currentParams = Object.fromEntries([...searchParams]);

  const handlePageSelect = (action, index) => {
    setSearchParams({
      ...currentParams,
      page: getNewpage(action, index),
    });
  };

  const getNewpage = (action, index) => {
    console.log(typeof index);
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
    <Pagination className="d-flex justify-content-center mt-5">
      <Pagination.First href="#" onClick={() => handlePageSelect("first")} />
      <Pagination.Prev href="#" onClick={() => handlePageSelect("prev")} />

      {[...Array(totalPages)].map((item, index) => (
        <Pagination.Item
          active={index + 1 === currentPage}
          href="#"
          onClick={() => handlePageSelect("current", index + 1)}
          key={index}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next href="#" onClick={() => handlePageSelect("next")} />
      <Pagination.Last href="#" onClick={() => handlePageSelect("last")} />
    </Pagination>
  );
};

export default PaginationComp;
