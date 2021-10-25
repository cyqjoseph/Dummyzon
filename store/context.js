import React, { useState } from "react";

const Context = React.createContext({
  name: "",
  cart: 0,
  changeNameHandler: () => {},
});

export const ContextProvider = function (props) {
  const [name, setName] = useState("");
  const changeNameHandler = function (name) {
    setName(name);
  };
  const [cart, setCart] = useState(0);
  const contextValue = {
    name,
    cart,
    changeNameHandler,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
