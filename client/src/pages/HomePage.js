import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Listings from "../components/Listings";
import ListingSkeleton from "../components/ListingSkeleton";
import PaginationComp from "../components/PaginationComp";
import { getListings } from "../redux/listingsSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { listings, status } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(getListings());
    // if (status === "pending") return <ListingSkeleton count={9} />;
  }, []);

  return (
    <div>
      <Listings listings={listings} status={status} />
      {status === "fulfilled" && <PaginationComp />}
    </div>
  );
};

export default HomePage;
