import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Index from './pages/index';
import Accounts from './modules/accounts/components/index';

import Layout from '../pages/layout';
import {AdminRoutes} from '../constants';

const AdminRouter = () => {
  return (
    <Router>
      <Index path={AdminRoutes.HOME} />
      <Accounts path={AdminRoutes.ACCOUNTS} />
    </Router>
  );
};

export default AdminRouter;
