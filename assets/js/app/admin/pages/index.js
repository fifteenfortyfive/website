import { h, Component } from 'preact';

import Layout from '../../pages/layout';
import Header from '../../uikit/header';
import Link from '../../uikit/link';

import {AdminRoutes} from '../../constants';

const AdminIndex = () => {
  return (
    <Layout>
      <Header>Admin</Header>

      <Link href={AdminRoutes.ACCOUNTS}>Accounts</Link>
    </Layout>
  );
};

export default AdminIndex;
