import { h, Component } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import * as AdminAccountActions from '../AccountActions';
import * as AdminAccountStore from '../AccountStore';
import Account from './Account';

import Layout from '../../../../modules/layout/components/Layout';
import Header from '../../../../uikit/Header';
import Link from '../../../../uikit/Link';

import { AdminRoutes } from '../../../../Constants';
import style from './Accounts.css';

const AdminAccounts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminAccountActions.fetchAccounts());
  }, []);

  const accountIds = useSelector(AdminAccountStore.getAccountIds);

  return (
    <Layout>
      <Header>Accounts</Header>

      <div class={style.accounts}>
        {accountIds.map(accountId => (
          <Account className={style.account} accountId={accountId} />
        ))}
      </div>

      <Link href={AdminRoutes.HOME}>Home</Link>
    </Layout>
  );
};

export default AdminAccounts;
