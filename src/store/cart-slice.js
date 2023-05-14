import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showCart: false,
    cartItems: [],
    totalPrice: "",
    totalQuantities: 0,
    qty: 1,
  },
  reducers: {
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
    incQty(state, action) {},
    decQty(state, action) {},
    onAdd(state, action) {},
    toggleCartItemQuantity(state, action) {},
    onRemove(state, action) {},
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
