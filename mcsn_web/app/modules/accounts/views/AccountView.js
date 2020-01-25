import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../layout/components/Layout';
import * as StreamActions from '../../streams/StreamActions';
import * as StreamStore from '../../streams/StreamStore';
import RunList from '../components/RunList';
import * as AccountActions from '../AccountActions';
import * as AccountStore from '../AccountStore';
import AccountCard from '../components/AccountCard';

import Header from '../../../uikit/Header';

const AccountView = props => {
  const dispatch = useDispatch();
  const { accountId } = props;

  const [loadingAccount, setLoadingAccount] = useState(false);
  const [loadingStream, setLoadingStream] = useState(false);

  useEffect(() => {
    setLoadingAccount(true);
    setLoadingStream(true);
    dispatch(AccountActions.fetchAccount(accountId)).then(() => setLoadingAccount(false));
    dispatch(StreamActions.fetchStream(accountId)).then(() => setLoadingStream(false));
  }, [accountId]);

  const { account, stream } = useSelector(state => ({
    account: AccountStore.getAccount(state, { accountId }),
    stream: StreamStore.getStream(state, { accountId }),
  }));

  return (
    <Layout>
      <div class="columns">
        {loadingAccount || account == null ? (
          <div class="column is-12">
            <Header size={Header.Sizes.H3}>Loading</Header>
          </div>
        ) : (
          <Fragment>
            <div class="column is-4-tablet is-4-desktop is-3-widescreen">
              <AccountCard account={account} stream={stream} loadingStream={loadingStream} />
            </div>

            <div class="column is-8-tablet is-6-desktop is-6-widescreen">
              <RunList runs={account.runs} />
            </div>
          </Fragment>
        )}
      </div>
    </Layout>
  );
};

export default AccountView;
