import { h, Component } from 'preact';
import {useEffect} from 'preact/hooks';
import {useDispatch, useSelector} from 'react-redux';

import * as AdminAccountActions from '../actions';
import * as AdminAccountsStore from '../selectors';
import Account from './account';

import Header from '../../../../uikit/header';
import Link from '../../../../uikit/link';
import Layout from '../../../../pages/layout';

import {AdminRoutes} from '../../../../constants';
import style from './index.css';

const AdminAccounts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminAccountActions.fetchAccounts())
  }, []);

  const accountIds = useSelector(AdminAccountsStore.getAccountIds);

  return (
    <Layout>
      <Header>Accounts</Header>

      <div class={style.accounts}>
        { accountIds.map((accountId) => <Account
            className={style.account}
            accountId={accountId}
          />)
        }
      </div>

      <Link href={AdminRoutes.HOME}>Home</Link>
    </Layout>
  );
};

export default AdminAccounts;
