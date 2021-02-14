import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { userKey, registerRoute } from '../../constants/strings';

export const ProtectedRoute = ({ component: Component, allowRender, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        if (allowRender || AuthService.isAuthenticated(userKey)) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: registerRoute,
                state: {
                  from: props.location.pathname,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
