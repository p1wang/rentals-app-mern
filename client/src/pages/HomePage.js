import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Listings from "../components/Listings";
import PaginationComp from "../components/PaginationComp";
import { getListings } from "../redux/listingsSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { listings, totalPages, status } = useSelector(
    (state) => state.listings
  );

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getListings({ page: searchParams.get("page") }));
  }, []);

  return (
    <div>
      <Listings listings={listings} status={status} />
      {status === "fulfilled" && <PaginationComp totalPages={totalPages} />}
    </div>
  );
};

export default HomePage;
