import { h } from 'preact';

import Layout from '../../modules/layout/components/Layout';
import Anchor from '../../uikit/Anchor';
import Header from '../../uikit/Header';

import { AdminRoutes } from '../../Constants';

const AdminIndex = () => {
  return (
    <Layout>
      <Header>Admin</Header>

      <Anchor href={AdminRoutes.ACCOUNTS}>Accounts</Anchor>
    </Layout>
  );
};

export default AdminIndex;
