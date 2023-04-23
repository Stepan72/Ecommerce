import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useContext } from "react";
import Context from "../../context/StateContext";
import Cart from "./Cart";

function Navbar() {
  const ctx = useContext(Context);
  // console.log(ctx);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">E-commerse Store</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => {
          ctx.setShowCart((prevState) => {
            return !prevState;
          });
        }}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{ctx.totalQuantities}</span>
      </button>
      {ctx.showCart && <Cart />}
    </div>
  );
}

export default Navbar;
