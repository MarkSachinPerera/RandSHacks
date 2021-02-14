import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { homeRoute, loginRoute, registerRoute } from '../constants/strings';
import AuthForm from '../components/auth/AuthForm';
import Home from '../components/Home/Home';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import Authservice from '../services/AuthService';

export default function Routes() {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path={homeRoute}
        component={(props) => <Home {...props} isAuthenticated={Authservice.isAuthenticated()} />}
      />

      <Route exact path={loginRoute} component={(props) => <AuthForm {...props} type="Login" />} />
      <Route
        exact
        path={registerRoute}
        component={(props) => <AuthForm {...props} type="Register" />}
      />
      <Route path="*" component={() => <Redirect to={homeRoute} />} />
    </Switch>
  );
}
