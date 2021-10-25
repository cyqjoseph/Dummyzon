import React, { useState } from "react";

const Context = React.createContext({
  name: "",
  cartPrice: 0,
  cartItems: [], //will contain array of objects
  changeNameHandler: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
});

export const ContextProvider = function (props) {
  const [name, setName] = useState("");
  const [cartPrice, setCartPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const changeNameHandler = function (name) {
    setName(name);
  };
  const addCartItem = function (item) {
    cartItems.push(item);
    setCartItems(cartItems); // will update adding logic
  };
  const removeCartItem = function (item) {
    setCartItems((prevState) => prevState.pop(item)); // will update removing logic
  };
  const contextValue = {
    name,
    cartPrice,
    cartItems,
    changeNameHandler,
    addCartItem,
    removeCartItem,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
