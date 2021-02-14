import React from "react";
import { Route, Redirect } from "react-router-dom";
export const Protected = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!window.localStorage.getItem("authen")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/product/all",
              }}
            />
          );
        }
      }}
    />
  );
};
