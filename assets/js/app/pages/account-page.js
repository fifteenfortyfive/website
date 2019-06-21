import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AccountActions from '../actions/accounts';
import * as StreamActions from '../actions/streams';

import AccountPreferences from '../containers/account-preferences';
import AccountCard from '../components/accounts/account-card';
import RunList from '../components/accounts/run-list';

const SubPages = {
  SHOW: 'show',
  PREFERENCES: 'preferences'
};

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subPage: SubPages.SHOW
    }
  }

  componentDidMount() {
    const {accountId, dispatch} = this.props;
    const {subPage} = this.state;

    dispatch(AccountActions.fetchAccount(accountId));
    dispatch(StreamActions.fetchStream(accountId));
  }

  goTo(subPage) {
    this.setState({ subPage });
  }

  renderNav() {
    const {account} = this.props;
    const {subPage} = this.state;

    switch(subPage) {
      case SubPages.SHOW:
        return (
          <div>
            { currentUserId && currentUserId === account.id &&
              <button
                class="button is-medium is-fullwidth"
                onClick={() => this.goTo(SubPages.PREFERENCES)}
              >
                Edit Preferences
              </button>
            }
          </div>
        );
      case SubPages.PREFERENCES:
        return (
          <div>
            <button
              class="button is-medium is-fullwidth"
              onClick={() => this.goTo(SubPages.SHOW)}
            >
              Back
            </button>
          </div>
        );
    }
  }

  renderPageBody() {
    const {account} = this.props;
    const {subPage} = this.state;

    switch(subPage) {
      case SubPages.PREFERENCES:
        return (
          <div class="column is-8">
            <AccountPreferences />
          </div>
        );
      case SubPages.SHOW:
      default:
        return (
          <div class="column is-8-tablet is-5-desktop is-5-widescreen">
            <RunList runs={account.runs} />
          </div>
        );
    }
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
      <div class="container">
        <section class="section">
          <div class="columns">
            <div class="column is-4-tablet is-4-desktop is-3-widescreen">
              <AccountCard
                account={account}
                stream={stream}
                loadingStream={loadingStream}
              />

              {this.renderNav()}
            </div>

            {this.renderPageBody()}
          </div>
        </section>
      </div>
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
