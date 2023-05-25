import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showCart: false,
    cartItems: [],
    totalPrice: null,
    totalQuantities: 0,
    qty: 1,
  },
  reducers: {
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
    incQty(state) {
      // console.log(state.qty);
      state.qty = state.qty + 1;
    },
    decQty(state) {
      // console.log(state.qty);
      if (state.qty === 1) {
        state.qty = 1;
      } else {
        state.qty = state.qty - 1;
      }
    },
    resetCart(state) {
      state.cartItems = [];
      state.totalPrice = null;
      state.totalQuantities = 0;
    },
    onAdd(state, action) {
      // console.log(action);
      state.totalPrice =
        state.totalPrice + action.payload.product.price * action.payload.qty;
      state.totalQuantities = state.totalQuantities + action.payload.qty;

      const checkProductInCart = state.cartItems?.find((item) => {
        return item._id === action.payload.product._id;
      });

      if (checkProductInCart) {
        const updatedCartItems = state.cartItems?.map((cartProduct) => {
          if (cartProduct._id === action.payload.product._id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + action.payload.qty,
            };
          }
        });

        state.cartItems = updatedCartItems;
      } else {
        action.payload.product.quantity = action.payload.qty;
        state.cartItems = [...state.cartItems, { ...action.payload.product }];
      }
      toast.success(
        `${state.qty} ${action.payload.product.name} added to the cart`
      );
    },

    toggleCartItemQuantity(state, action) {
      // console.log(action);
      const foundProduct = state.cartItems.find((item) => {
        return item._id === action.payload.id;
      });
      const index = state.cartItems.findIndex((product) => {
        return product._id === action.payload.id;
      });
      const newCartItems = state.cartItems.filter((item) => {
        return item._id != action.payload.id;
      });

      if (action.payload.value === "inc") {
        state.cartItems = [
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ];
        state.totalPrice = state.totalPrice + foundProduct.price;
        state.totalQuantities = ++state.totalQuantities;
      } else if (action.payload.value === "dec") {
        if (foundProduct.quantity > 1) {
          state.cartItems = [
            ...newCartItems,
            { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ];
          state.totalPrice = state.totalPrice - foundProduct.price;
          state.totalQuantities = --state.totalQuantities;
        }
      }
    },
    onRemove(state, action) {
      // console.log(action);
      const foundProduct = state.cartItems.find((item) => {
        return item._id === action.payload._id;
      });
      const newCartItems = state.cartItems.filter((item) => {
        return item._id != action.payload._id;
      });

      state.totalPrice =
        state.totalPrice - foundProduct.price * foundProduct.quantity;
      state.totalQuantities = state.totalQuantities - foundProduct.quantity;
      state.cartItems = newCartItems;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
