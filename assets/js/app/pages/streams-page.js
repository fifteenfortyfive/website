import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import Avatar from '../components/accounts/avatar';
import StreamCard from '../components/stream-card';

import {Routes} from '../constants';
import * as AccountActions from '../actions/accounts';
import * as StreamActions from '../actions/streams';


class StreamsPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(StreamActions.fetchStreams());
  }

  componentDidUpdate(prevProps) {
    const {streams} = this.props;
    if(prevProps.streams != streams) {
      this.refetchAccounts();
    }
  }

  refetchAccounts() {
    const {streams, dispatch} = this.props;
    const accountIds = _.keys(streams).join(",");

    dispatch(AccountActions.fetchAccounts(accountIds));
  }

  render() {
    const {
      accounts,
      streams,
      loading,
      loadingAccounts,
    } = this.props;

    return (
      <div class="container">
        <section class="section">
          <h1 class="title">Live Streams!</h1>

          <div class="ff-grid is-4">
            { _.map(streams, (stream, accountId) => {
                const account = accounts[accountId];
                return <StreamCard
                  account={account}
                  stream={stream}
                  loadingAccount={loadingAccounts}
                  loadingStream={loading}
                />;
              })
            }
          </div>
        </section>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    streams: state.streams,
    accounts: state.accounts,
    loading: state.fetching['streams'],
    loadingAccounts: state.fetching['accounts']
  };
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StreamsPage);
