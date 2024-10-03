import React, { createContext } from "react";
import { useLocalObservable } from "mobx-react-lite";
import tableStore from "./TableStore";

export const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const store = useLocalObservable(() => tableStore);

  return (
    <TableContext.Provider value={store}>{children}</TableContext.Provider>
  );
};