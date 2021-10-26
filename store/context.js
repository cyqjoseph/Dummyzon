import React, { useState } from "react";

const Context = React.createContext({
  name: "",
  cartPrice: 0,
  cartItems: [], //will contain array of objects
  changeNameHandler: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  setCtxCartItems: () => {},
});

export const ContextProvider = function (props) {
  const [name, setName] = useState("");
  const [cartPrice, setCartPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const changeNameHandler = function (name) {
    setName(name);
  };
  const setCtxCartItems = function (items) {
    setCartItems(items);
    console.log(cartItems);
    let totalPrice;
    for (const item of cartItems) {
      totalPrice += parseFloat(+item.price.replace("$", "") * count);
    }
    // cartItems.forEach((item) => {

    //   totalPrice += parseFloat(item.price.replace("$", "")) * count;
    //   console.log(totalPrice);
    //   return totalPrice;
    // });
    console.log(totalPrice);
    setCartPrice(totalPrice);
  };
  const addCartItem = function (item) {
    setCartPrice(
      (prevPrice) => prevPrice + parseFloat(item.price.replace("$", ""))
    );
    const cartItemIndex = cartItems.findIndex((cartItem) =>
      Object.values(cartItem).includes(item.title)
    );
    if (cartItemIndex !== -1) {
      const newCartItem = {
        ...cartItems[cartItemIndex],
        count: ++cartItems[cartItemIndex].count,
      };
      console.log(newCartItem);
      cartItems.splice(cartItemIndex, 1, newCartItem);
    } else {
      cartItems.push({ title: item.title, count: 1, price: item.price });
    }
    setCartItems(cartItems);
  };
  const removeCartItem = function (item) {
    setCartPrice(
      (prevPrice) => prevPrice - parseFloat(item.price.replace("$", ""))
    );
    const cartItemIndex = cartItems.findIndex((cartItem) =>
      Object.values(cartItem).includes(item.title)
    );
    const cartItemToBeRemoved = cartItems[cartItemIndex];
    if (cartItemToBeRemoved.count === 1) {
      cartItems.splice(cartItemIndex, 1);
    } else {
      const newCartItem = {
        ...cartItems[cartItemIndex],
        count: --cartItems[cartItemIndex].count,
      };
      console.log(newCartItem);
      cartItems.splice(cartItemIndex, 1, newCartItem);
    }
    setCartItems(cartItems);
  };
  const contextValue = {
    name,
    cartPrice,
    cartItems,
    changeNameHandler,
    addCartItem,
    removeCartItem,
    setCtxCartItems,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
