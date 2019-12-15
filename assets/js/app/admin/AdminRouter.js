import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Route, Switch } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import RouterUtils from '../modules/router/RouterUtils';
import AdminIndex from './pages/AdminIndex';
import Accounts from './modules/accounts/components/Accounts';

import { AdminRoutes, Routes } from '../Constants';

const AdminRouter = () => {
  const { isLoggedIn, account } = useAuth();

  useEffect(() => {
    if (!isLoggedIn || !account.admin) {
      RouterUtils.navigateTo(Routes.HOME, { replace: true });
    }
  }, [isLoggedIn, account]);

  return (
    <Switch>
      <Route path={AdminRoutes.HOME} component={AdminIndex} />
      <Route path={AdminRoutes.ACCOUNTS} component={Accounts} />
    </Switch>
  );
};

export default AdminRouter;
