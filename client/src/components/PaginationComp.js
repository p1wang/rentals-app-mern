import React, { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const PaginationComp = ({ totalPages }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let currentPage = Number(searchParams.get("page"));

  return (
    <Pagination className="d-flex justify-content-center mt-5 mb-5">
      <Pagination.First href={currentPage > 1 ? `/listings?page=1` : "#"} />
      <Pagination.Prev
        href={currentPage > 1 ? `/listings?page=${currentPage - 1}` : "#"}
      />

      {[...Array(totalPages)].map((item, index) => (
        <Pagination.Item
          active={index + 1 === currentPage}
          href={`/listings?page=${index + 1}`}
          key={index}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        href={
          currentPage < totalPages ? `/listings?page=${currentPage + 1}` : "#"
        }
      />
      <Pagination.Last
        href={currentPage < totalPages ? `/listings?page=${totalPages}` : "#"}
      />
    </Pagination>
  );
};

export default PaginationComp;
