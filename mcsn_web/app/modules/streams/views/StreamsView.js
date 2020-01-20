import { h, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as AccountActions from '../../accounts/AccountActions';
import Layout from '../../layout/components/Layout';
import * as StreamActions from '../StreamActions';
import StreamCard from '../components/StreamCard';

class StreamsView extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    dispatch(StreamActions.fetchStreams()).then(() => this.setState({ loading: false }));
  }

  componentDidUpdate(prevProps) {
    const { streams } = this.props;
    if (prevProps.streams !== streams) {
      this.refetchAccounts();
    }
  }

  refetchAccounts() {
    const { streams, dispatch } = this.props;
    const accountIds = _.keys(streams).join(',');
    if (accountIds.length === 0) return;

    dispatch(AccountActions.fetchAccounts(accountIds));
  }

  render() {
    const { accounts, streams } = this.props;

    return (
      <Layout>
        <h1 class="title">Live Streams!</h1>

        <div class="ff-grid is-4">
          {_.map(streams, (stream, accountId) => {
            const account = accounts[accountId];
            return <StreamCard account={account} stream={stream} />;
          })}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    streams: state.streams,
    accounts: state.accounts,
  };
};

export default connect(mapStateToProps)(StreamsView);
