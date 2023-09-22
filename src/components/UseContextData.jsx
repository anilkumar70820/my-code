import { useState } from "react";
import { createContext } from "react";

export const UseContextData = createContext();

export default function UseContextDataProvider({ children }) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const [show, setShow] = useState(true);
  const newObj = { name: "abc", age: 123, description: "this is for testing" };
  const [preloader,setPreloader] = useState(true)
  const value = { arr, show, newObj, setShow, preloader, setPreloader };
  return <UseContextData.Provider value={value}>{children}</UseContextData.Provider>;
}