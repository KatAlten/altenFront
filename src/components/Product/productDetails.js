import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useGetProductByIdQuery } from "../../features/product/productApi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { setSelectedProduct } from "../../features/product/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import "./productDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  const { data, isSuccess, isLoading } = useGetProductByIdQuery(id);

  const handleAddToCart = (selectedProduct) => {
    dispatch(addToCart({ productId: selectedProduct.id }));
  };
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setSelectedProduct(data));
    }
  });
  if (!selectedProduct) {
    return (
      <div className="container w-50">
        <div className="alert alert-danger d-flex justify-content-center mt-5">
          <span className="h3">Id of product missing </span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container w-50 ">
      <div className="d-flex justify-content-center mt-5">
        <h2 className="product-title">
          <strong>{selectedProduct.name}</strong>
        </h2>
      </div>
      <Card className={`mb-4 shadow-sm mt d-flex flex-row`}>
        <div className="img-details-container">
          <img
            className="img-details px-3"
            src={selectedProduct.image}
            alt={selectedProduct.title}
          />
        </div>

        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>
            <span className="product-title">{selectedProduct.Title}</span>
          </Card.Title>
          <Card.Text className="align-self-center product-price">
            <strong>Price : ${selectedProduct.price} </strong>
          </Card.Text>
          <Card.Text>
            <strong>{selectedProduct.description} </strong>
          </Card.Text>
          <Card.Text>
            <span className="mt-auto d-flex justify-content-between align-items-center">
              <span className="badge bg-success">
                Rating : {selectedProduct.rating}/5
              </span>
            </span>
          </Card.Text>
          <Card.Text>
            <span className="text-muted">({selectedProduct.category})</span>
          </Card.Text>
          <Button
            className="align-self-center w-25 mt-auto add-to-cart-button"
            variant="primary"
            onClick={() => handleAddToCart(selectedProduct)}
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductDetails;
