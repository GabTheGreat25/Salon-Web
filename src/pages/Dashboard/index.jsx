import React from "react";
import GetAllUsers from "./GetAllUsers";
import TypeOfProducts from "./TypeOfProducts";
import ProductBrands from "./ProductBrands";
import MonthlySales from "./MonthlySales";
import GetAllServices from "./GetAllServices";

export default function () {
  return (
    <>
      <div className="grid px-10 justify-center items-center h-full dark:bg-dark-default py-10">
        <div className="grid justify-center items-center grid-cols-2">
          <GetAllUsers />
          <GetAllServices />
        </div>

        <div className="grid justify-center items-center grid-cols-2">
          <TypeOfProducts />
          <ProductBrands />
        </div>
        <MonthlySales />
      </div>
    </>
  );
}
