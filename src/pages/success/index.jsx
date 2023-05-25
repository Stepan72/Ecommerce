import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { cartActions } from "@/store/cart-slice";
import { useSelector, useDispatch } from "react-redux";
import { runFireworks } from "../../../lib/utils";

function Success() {
  // const {setTotalPrice, setCartItems, setTotalQuantities} = useContext(Context);
  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(cartActions.resetCart());
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for receipt</p>
        <p className="description">
          If you have any questions, please email{" "}
          <a className="email" href="mailto:orders@example.com">
            orders@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="button__success btn">
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
