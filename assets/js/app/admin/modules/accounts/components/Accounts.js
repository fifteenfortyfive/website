import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import * as AdminAccountActions from '../AccountActions';
import * as AdminAccountStore from '../AccountStore';
import Account from './Account';

import Layout from '../../../../modules/layout/components/Layout';
import Anchor from '../../../../uikit/Anchor';
import Header from '../../../../uikit/Header';

import { AdminRoutes } from '../../../AdminRouter';
import styles from './Accounts.mod.css';

const AdminAccounts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminAccountActions.fetchAccounts());
  }, []);

  const accountIds = useSelector(AdminAccountStore.getAccountIds);

  return (
    <Layout>
      <Header>Accounts</Header>

      <div class={styles.accounts}>
        {accountIds.map(accountId => (
          <Account key={accountId} className={styles.account} accountId={accountId} />
        ))}
      </div>

      <Anchor href={AdminRoutes.HOME}>Home</Anchor>
    </Layout>
  );
};

export default AdminAccounts;
