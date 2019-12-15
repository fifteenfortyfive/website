import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Route } from 'react-router-dom';

import useAuth from './hooks/useAuth';
import RouterUtils from './modules/router/RouterUtils';

import { Routes } from './Constants';

const AuthenticatedRoute = props => {
  const { children, ...routeProps } = props;

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    Routes.LOGIN({ redirect: RouterUtils.getCurrentPath() });
  }, [isLoggedIn]);

  return <Route {...routeProps}>{isLoggedIn ? children : null}</Route>;
};

export default AuthenticatedRoute;
