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
  toggleCartItemQuantity: (id, value) => {},
});

export default Context;

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

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

  function toggleCartItemQuantity(id, value) {
    foundProduct = cartItems.find((item) => {
      return item._id === id;
    });
    index = cartItems.findIndex((product) => {
      return product._id === id;
    });
    const newCartItems = cartItems.filter((item) => {
      return item._id != id;
    });

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => {
        return prevTotalPrice + foundProduct.price;
      });
      setTotalQuantities((prevTotal) => {
        return prevTotal + 1;
      });
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => {
          return prevTotalPrice - foundProduct.price;
        });
        setTotalQuantities((prevTotal) => {
          return prevTotal - 1;
        });
      } else {
      }
    }
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
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};
