import React, { useState } from "react";

const Context = React.createContext({
  name: "",
  changeNameHandler: () => {},
});

export const ContextProvider = function (props) {
  const [name, setName] = useState("");
  const changeNameHandler = function (name) {
    setName(name);
  };
  const contextValue = {
    name: name,
    changeNameHandler: changeNameHandler,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
