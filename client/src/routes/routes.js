import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  homeRoute,
  leaderboardRoute,
  loginRoute,
  prizesRoute,
  registerRoute,
} from '../constants/strings';
import AuthForm from '../components/auth/AuthForm';
import Home from '../components/Home/Home';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import Authservice from '../services/AuthService';
import Leaderboard from '../components/leaderboard/Leaderboard';
import Prize from '../components/Prize/Prize';

export default function Routes({ updateScore, handleButtonClick }) {
  return (
    <Switch>
      <ProtectedRoute
        allowRender={true}
        exact
        path={homeRoute}
        component={(props) => (
          <Home
            {...props}
            isAuthenticated={Authservice.isAuthenticated()}
            updateScore={updateScore}
            handleButtonClick={handleButtonClick}
          />
        )}
      />
      <ProtectedRoute
        allowRender={true}
        exact
        path={leaderboardRoute}
        component={(props) => <Leaderboard {...props} />}
      />
      <ProtectedRoute
        allowRender={true}
        exact
        path={prizesRoute}
        component={(props) => <Prize {...props} />}
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
