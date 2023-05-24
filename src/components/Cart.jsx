import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
// import Context from "../../context/StateContext";
// import { useContext } from "react";
import { urlFor } from "../../lib/client";
import { cartActions } from "@/store/cart-slice";
import { useSelector, useDispatch } from "react-redux";
import getStripe from "../../lib/getStripe";

function Cart() {
  const cartRef = useRef();

  /// old useContext
  // const {
  //   totalPrice,
  //   totalQuantities,
  //   cartItems,
  //   setShowCart,
  //   toggleCartItemQuantity,
  //   onRemove,
  // } = useContext(Context);
  /// new Redux
  const dispatch = useDispatch();
  const { totalPrice, totalQuantities, cartItems } = useSelector(
    (state) => state.cart
  );

  async function handleCheckout() {
    // console.log(cartItems);
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;
    const data = await response.json();
    console.log(data);
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          className="cart-heading"
          // onClick={() => {
          //   setShowCart(false);
          // }}
          onClick={() => {
            dispatch(cartActions.setShowCart());
          }}
          type="button"
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                className="btn"
                // onClick={() => {
                //   setShowCart(false);
                // }}
                onClick={() => {
                  dispatch(cartActions.setShowCart());
                }}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => {
              return (
                <div className="product" key={item._id}>
                  <img
                    src={urlFor(item?.image[0])}
                    className="cart-product-image"
                    alt="product-img"
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className="flex bottim">
                      <div>
                        <p className="quantity-desc">
                          <span
                            className="minus"
                            onClick={() => {
                              // toggleCartItemQuantity(item._id, "dec");
                              const id = item._id;
                              const value = "dec";
                              dispatch(
                                cartActions.toggleCartItemQuantity({
                                  id,
                                  value,
                                })
                              );
                            }}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item.quantity}</span>
                          <span
                            className="plus"
                            onClick={() => {
                              // toggleCartItemQuantity(item._id, "inc");
                              const id = item._id;
                              const value = "inc";
                              dispatch(
                                cartActions.toggleCartItemQuantity({
                                  id,
                                  value,
                                })
                              );
                            }}
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => {
                          // onRemove(item._id);
                          dispatch(cartActions.onRemove(item));
                        }}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3> Subtotal:</h3>

              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
