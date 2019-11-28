import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import * as AccountActions from '../../accounts/AccountActions';
import Avatar from '../../../uikit/avatar';
import Layout from '../../../pages/layout';
import * as StreamActions from '../StreamActions';
import StreamCard from '../components/StreamCard';

import {Routes} from '../../../constants';


class StreamsView extends Component {
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
      <Layout>
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
      </Layout>
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

export default connect(mapStateToProps)(StreamsView);
