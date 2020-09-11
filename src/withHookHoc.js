import React from "react";
import { useToasts } from "react-toast-notifications";

export const withHooksHOC = (Component) => {
  return (props) => {
    const addToast = useToasts();
    return <Component addToast={addToast} {...props} />;
  };
};
