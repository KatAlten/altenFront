import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity = 1 } = action.payload;

      const existingProduct = state.cart.find(
        (product) => product.productId === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ productId, quantity });
      }
    },
    removeFromCart(state, action) {
      const cartItem = action.payload;
      state.cart = state.cart.filter(
        (product) => product.productId !== cartItem.productId
      );
    },
    increaseQty(state, action) {
      const cartItem = action.payload;
      const product = state.cart.find(
        (product) => product.productId === cartItem.productId
      );
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQty(state, action) {
      const cartItem = action.payload;
      const product = state.cart.find(
        (product) => product.productId === cartItem.productId
      );
      if (product?.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
