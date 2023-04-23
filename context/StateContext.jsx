import { previewData } from "next/dist/client/components/headers";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext({
  showCart: false,
  cartItems: [],
  totalPrice: "",
  totalQuantities: 0,
  qty: 1,
  setShowCart: () => {},
  incQty: () => {},
  decQty: () => {},
  onAdd: (product, quantity) => {},
});

export default Context;

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  function onAdd(product, quantity) {
    setTotalPrice((prevTotalPrice) => {
      return prevTotalPrice + product.price * quantity;
    });
    setTotalQuantities((prevTotal) => {
      return prevTotal + quantity;
    });

    const checkProductInCart = cartItems?.find((item) => {
      return item._id === product._id;
    });

    if (checkProductInCart) {
      const updatedCartItems = cartItems?.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  }

  const incQty = () => {
    setQty((prevQty) => {
      return prevQty + 1;
    });
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) {
        return 1;
      } else {
        return prevQty - 1;
      }
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
