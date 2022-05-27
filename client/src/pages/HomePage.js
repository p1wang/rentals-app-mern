import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";

import Listings from "../components/Listings";
import PaginationComp from "../components/PaginationComp";
import { getListings, getListingsByQuery } from "../redux/listingsSlice";
import FilterForm from "../components/Forms/FilterForm";
import { setAlert } from "../redux/alertSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const [showFilterForm, setShowFilterForm] = useState(false);
  const { listings, totalPages, isLoading } = useSelector(
    (state) => state.listings
  );

  let [searchParams, setSearchParams] = useSearchParams();
  let currentParams = Object.fromEntries([...searchParams]);

  let location = useLocation();

  let { pathname } = useLocation();

  // default listings
  useEffect(() => {
    pathname === "/listings" &&
      dispatch(
        getListings({
          searchQuery: currentParams,
        })
      )
        .unwrap()
        .then(() => {
          return;
        })
        .catch((rejectedValueOrSerializedError) => {
          dispatch(
            setAlert({
              variant: "danger",
              message: rejectedValueOrSerializedError,
            })
          );
        });
    // searched listings
    pathname === "/listings/search" &&
      dispatch(getListingsByQuery({ searchQuery: currentParams }))
        .unwrap()
        .then(() => {
          return;
        })
        .catch((rejectedValueOrSerializedError) => {
          dispatch(
            setAlert({
              variant: "danger",
              message: rejectedValueOrSerializedError,
            })
          );
        });
  }, [location]);

  return (
    <div>
      {!isLoading && (
        <>
          <Accordion className="mb-5">
            <Accordion.Item eventKey={showFilterForm ? "1" : "0"}>
              <Accordion.Header>Filter</Accordion.Header>
              <Accordion.Body>
                <FilterForm setShowFilterForm={setShowFilterForm} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Listings listings={listings} />
        </>
      )}
      {/* 
      {listings.length === 0 && !isLoading && (
        <span className="d-block text-center">No listings were found.</span>
      )} */}

      {/* <PaginationComp totalPages={totalPages} /> */}
      {!isLoading && <PaginationComp totalPages={totalPages} />}
    </div>
  );
};

export default HomePage;
