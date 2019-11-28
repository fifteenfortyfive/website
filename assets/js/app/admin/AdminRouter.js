import { h, Component } from 'preact';
import { Router } from 'preact-router';

import AdminIndex from './pages/AdminIndex';
import Accounts from './modules/accounts/components/Accounts';

import {AdminRoutes} from '../Constants';

const AdminRouter = () => {
  return (
    <Router>
      <AdminIndex path={AdminRoutes.HOME} />
      <Accounts path={AdminRoutes.ACCOUNTS} />
    </Router>
  );
};

export default AdminRouter;
