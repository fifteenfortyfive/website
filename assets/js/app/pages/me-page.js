import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AccountActions from '../actions/accounts';
import * as StreamActions from '../actions/streams';
import * as MeActions from '../actions/me';

import AccountPreferences from '../containers/account-preferences';
import AccountCard from '../components/accounts/account-card';
import RunList from '../components/accounts/run-list';

const Pages = {
  SHOW: 'show',
  EDIT: 'edit',
  PREFERENCES: 'preferences'
};

class MePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subPage: Pages.SHOW
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;
    const {subPage} = this.state;

    dispatch(MeActions.fetchMe());
  }

  componentDidUpdate(prevProps, prevState) {
    const {dispatch} = this.props;
    const {subPage} = this.state;
    const pageChanged = prevState.subPage !== subPage;

    if(pageChanged && subPage === Pages.SHOW) {
      dispatch(MeActions.fetchMe());
    }
  }

  goTo(subPage) {
    this.setState({ subPage });
  }

  renderNav() {
    const {account} = this.props;
    const accountId = account && account.id;
    return (
      <div>
        { accountId &&
          <Link
            href={`/accounts/${accountId}`}
            class="button is-medium is-fullwidth is-light"
          >
            View Public Profile
          </Link>
        }
      </div>
    );
  }

  renderPageNav() {
    const {account} = this.props;
    const {subPage} = this.state;

    switch(subPage) {
      case Pages.SHOW:
        return (
          <div>
            <button
              class="button is-medium is-fullwidth is-light has-margin-top-sm"
              onClick={() => this.goTo(Pages.PREFERENCES)}
            >
              Edit Preferences
            </button>
            <button
              class="button is-medium is-fullwidth is-light has-margin-top-sm"
              onClick={() => this.goTo(Pages.EDIT)}
            >
              Edit Account
            </button>
          </div>
        );
    }
  }

  renderPageBody() {
    const {account} = this.props;
    const {subPage} = this.state;

    switch(subPage) {
      case Pages.PREFERENCES:
        return (
          <div class="column is-8">
            <AccountPreferences onFinish={() => this.goTo(Pages.SHOW)} />
          </div>
        );
      case Pages.SHOW:
      default:
        return (
          <div class="column is-8-tablet is-5-desktop is-5-widescreen">
            <div>Hi there's nothing here yet</div>
          </div>
        );
    }
  }

  render() {
    const {
      account,
      loadingAccount
    } = this.props;

    if(account == null) return "loading";

    return (
      <div class="container">
        <section class="section">
          <div class="columns">
            <div class="column is-4-tablet is-4-desktop is-3-widescreen">
              <AccountCard
                account={account}
                loading={loadingAccount}
              />

              {this.renderNav()}
              {this.renderPageNav()}
            </div>

            {this.renderPageBody()}
          </div>
        </section>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const accountId = state.me.account && state.me.account.id;

  return {
    account: state.me.account,
    loadingAccount: state.fetching[`accounts.${accountId}`]
  };
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MePage);
