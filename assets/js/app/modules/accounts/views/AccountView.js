import { h, Component, Fragment } from 'preact';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as StreamActions from '../../../actions/streams';
import RunList from '../components/RunList';
import * as AccountActions from '../AccountActions';
import AccountCard from '../components/AccountCard';
import Layout from '../../../pages/layout';

import Header from '../../../uikit/header';


class AccountView extends Component {
  componentDidMount() {
    const {accountId, dispatch} = this.props;

    dispatch(AccountActions.fetchAccount(accountId));
    dispatch(StreamActions.fetchStream(accountId));
  }

  render() {
    const {
      account,
      stream,
      loadingAccount,
      loadingStream
    } = this.props;
    const loading = loadingAccount || loadingStream;

    return (
      <Layout>
        <div class="columns">
          { loading || account == null
            ? <div class="column is-12">
                <Header size={Header.Sizes.H3}>Loading</Header>
              </div>
            : <Fragment>
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
              </Fragment>
          }
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
)(AccountView);
