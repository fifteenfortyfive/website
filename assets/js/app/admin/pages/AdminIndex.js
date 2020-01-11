import { h } from 'preact';

import Layout from '../../modules/layout/components/Layout';
import Anchor from '../../uikit/Anchor';
import Header from '../../uikit/Header';

import { AdminRoutes, CURRENT_EVENT_ID } from '../../Constants';

const AdminIndex = () => {
  return (
    <Layout>
      <Header>Admin</Header>

      <ul>
        <li>
          <Anchor href={AdminRoutes.ACCOUNTS}>Accounts</Anchor>
        </li>
        <li>
          <Anchor href={AdminRoutes.EVENT_SCHEDULING({ eventId: CURRENT_EVENT_ID })}>Scheduling</Anchor>
        </li>
      </ul>
    </Layout>
  );
};

export default AdminIndex;
