import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { homeRoute, loginRoute, registerRoute } from '../constants/strings';
import AuthForm from '../components/auth/AuthForm';
import Home from '../components/Home/Home';

export default function Routes() {
  return (
    <Switch>
      <Route exact path={homeRoute} component={(props) => <Home {...props} />} />

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
