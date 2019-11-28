import { h, Component } from 'preact';

import Layout from '../../modules/layout/components/Layout';
import Header from '../../uikit/Header';
import Link from '../../uikit/Link';

import {AdminRoutes} from '../../Constants';

const AdminIndex = () => {
  return (
    <Layout>
      <Header>Admin</Header>

      <Link href={AdminRoutes.ACCOUNTS}>Accounts</Link>
    </Layout>
  );
};

export default AdminIndex;
