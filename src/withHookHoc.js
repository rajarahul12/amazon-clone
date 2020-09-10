import React from "react";
import { useToasts } from "react-toast-notifications";

export const withHooksHOC = (Component) => {
  return (props) => {
    const addToast = useToasts();
    console.log("INside HOC");
    return <Component addToast={addToast} {...props} />;
  };
};
