import React, { useState } from "react";

const Context = React.createContext({
  name: "",
  cartPrice: 0,
  cartItems: [], //will contain array of objects
  changeNameHandler: () => {},
});

export const ContextProvider = function (props) {
  const [name, setName] = useState("");
  const changeNameHandler = function (name) {
    setName(name);
  };
  const [cartPrice, setCartPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const contextValue = {
    name,
    cartPrice,
    cartItems,
    changeNameHandler,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
