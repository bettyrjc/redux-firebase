import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        !isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PublicRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
