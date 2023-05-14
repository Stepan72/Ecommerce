import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
// import { useContext } from "react";
// import Context from "../../context/StateContext";
import Cart from "./Cart";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";

function Navbar() {
  // New Redux toolkit
  const dispatch = useDispatch();
  const cartRedux = useSelector((state) => state.cart.showCart);
  const totalQuantitiesRedux = useSelector(
    (state) => state.cart.totalQuantities
  );

  // Old useContext
  // const ctx = useContext(Context);
  // console.log(ctx);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">E-commerse Store</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        // onClick={() => {
        //   ctx.setShowCart((prevState) => {
        //     return !prevState;
        //   });
        // }}
        onClick={() => {
          dispatch(cartActions.setShowCart());
        }}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">
          {/* {ctx.totalQuantities} */}
          {totalQuantitiesRedux}
        </span>
      </button>
      {/* {ctx.showCart && <Cart />} */}
      {cartRedux && <Cart />}
    </div>
  );
}

export default Navbar;
