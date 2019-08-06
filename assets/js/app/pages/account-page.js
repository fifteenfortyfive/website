import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AccountActions from '../actions/accounts';
import * as StreamActions from '../actions/streams';
import AccountCard from '../components/accounts/account-card';
import RunList from '../components/accounts/run-list';
import Layout from './layout';


class AccountPage extends Component {
  componentDidMount() {
    const {accountId, dispatch} = this.props;

    dispatch(AccountActions.fetchAccount(accountId));
    dispatch(StreamActions.fetchStream(accountId));
  }

  render() {
    const {
      account,
      stream,
      currentUserId,
      loadingAccount,
      loadingStream
    } = this.props;
    const loading = loadingAccount || loadingStream;

    if(account == null) return "loading";

    return (
      <Layout>
        <div class="columns">
          <div class="column is-4-tablet is-4-desktop is-3-widescreen">
            <AccountCard
              account={account}
              stream={stream}
              loadingStream={loadingStream}
            />
          </div>

          <div class="column is-8-tablet is-6-desktop is-6-widescreen">
            <RunList runs={account.runs} />
          </div>
        </div>
      </Layout>
    );
  }
};

const mapStateToProps = (state, props) => {
  const {accountId} = props;
  return {
    account: state.accounts[accountId],
    stream: state.streams[accountId],
    loadingAccount: state.fetching[`accounts.${accountId}`],
    loadingStream: state.fetching[`streams.${accountId}`]
  };
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountPage);
