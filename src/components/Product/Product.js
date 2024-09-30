import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../../features/product/productApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setProducts,
  setSelectedProduct,
} from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";

function Product() {
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);

  const handleOnClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/products/${product.id}`);
  };
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch, isLoading, isSuccess]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="alert alert-danger">{error.message}</div>;
  }
  if (products?.length > 0) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-5">
          <strong> Products </strong>
        </h2>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 product-item">
              <ProductCard
                product={product}
                onClick={() => handleOnClick(product)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Product;
