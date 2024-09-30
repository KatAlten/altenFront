import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../../features/cart/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalPrice = cart.reduce((total, cartItem) => {
    const product = products.find(
      (product) => cartItem.productId === product.id
    );
    return total + product.price * cartItem.quantity;
  }, 0);

  const handleIncrease = (cartItem) => {
    dispatch(increaseQty(cartItem));
  };
  const handleDecrease = (cartItem) => {
    dispatch(decreaseQty(cartItem));
  };
  const handleRemove = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  if (!cart || cart?.length <= 0) {
    return (
      <div className="container w-50 cart-empty">
        <div className="alert alert-danger d-flex justify-content-center mt-5">
          <span className="h3">Your Cart is empty</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container d-flex flex-column mt-5">
      {cart.map((cartItem) => {
        const product = products.find(
          (product) => product.id === cartItem.productId
        );
        if (!product) {
          return null;
        }

        return (
          <div
            key={product.id}
            className="d-flex flex-row align-self-center shadow-lg rounded mb-3 w-50 cart-item"
          >
            <div className="container-img me-3">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid"
              />
            </div>
            <div className="d-flex flex-column align-items-center w-100">
              <h5>{product.name}</h5>
              <span>Price: ${product?.price}</span>
              <div className="d-flex flex-row align-items-center justify-content-center mt-auto mb-3">
                <button
                  className="btn btn-outline-primary gx-2 mx-3 dec-qty"
                  onClick={() => handleDecrease(cartItem)}
                >
                  -
                </button>
                <span className="item-qty">{cartItem.quantity}</span>
                <button
                  className="btn btn-outline-primary gx-2 mx-3 inc-qty"
                  onClick={() => handleIncrease(cartItem)}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-danger mb-3 remove"
                onClick={() => handleRemove(cartItem)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        );
      })}
      <div className="d-flex flex-row justify-content-between w-50 align-self-center border shadow-lg mb-4">
        <span className="mx-5 h3">Total items : {totalQuantity}</span>
        <span className="mx-5 h3">Total price : ${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default Cart;
