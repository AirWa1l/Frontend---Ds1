import Product from "./Product/Product";

import "./Products.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { memo } from "react";
import Skeleton from "react-loading-skeleton";


const Products = ({products}) => {
  let {store} = useGlobalContext();
   // Usa los productos recibidos como parámetro o los del store por defecto
   let availableProducts = products && products.length > 0 
   ? products 
   : store.state.products;

  let sortedProducts = availableProducts
    .slice().sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="sub-container" id="products">
      <h2></h2>
      {store.state.products.length > 0 ? (
        <div className="contains-product">
          {sortedProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="skeleton">
          <Skeleton height={250}></Skeleton>
        </div>
      )}
    </div>
  );
};
export default memo(Products);
