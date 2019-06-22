import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Link, route } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AccountActions from '../actions/accounts';
import * as StreamActions from '../actions/streams';
import * as MeActions from '../actions/me';

import Preferences from '../components/me/preferences';
import Edit from '../components/me/edit';
import AccountCard from '../components/accounts/account-card';
import RunList from '../components/accounts/run-list';

import { Routes } from '../constants';

const Pages = {
  SHOW: 'show',
  EDIT: 'edit',
  PREFERENCES: 'preferences'
};

class MePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(MeActions.fetchMe());
  }

  componentDidUpdate(prevProps, prevState) {
    const {dispatch, page} = this.props;
    const pageChanged = prevState.page != page;

    if(pageChanged && page === Pages.SHOW) {
      dispatch(MeActions.fetchMe());
    }
  }

  renderNav() {
    const {account} = this.props;
    const accountId = account && account.id;
    return (
      <div>
        { accountId &&
          <Link
            href={Routes.ACCOUNT(accountId)}
            class="button is-medium is-fullwidth is-light"
          >
            View Public Profile
          </Link>
        }

        <div>
          <Link
            class="button is-medium is-fullwidth is-light has-margin-top-sm"
            href={Routes.ME_PREFERENCES}
          >
            Edit Preferences
          </Link>
          <Link
            class="button is-medium is-fullwidth is-light has-margin-top-sm"
            href={Routes.ME_EDIT}
          >
            Edit Account
          </Link>
        </div>
      </div>
    );
  }

  renderPageBody() {
    const {account, page} = this.props;

    switch(page) {
      case Pages.PREFERENCES:
        return (
          <Preferences onFinish={() => route(Routes.ME)} />
        );
      case Pages.EDIT:
        return (
          <Edit onFinish={() => route(Routes.ME)} />
        );
      case Pages.SHOW:
      default:
        return (
          <div>Hi there's nothing here yet</div>
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
            </div>


            <div class="column is-8">
              {this.renderPageBody()}
            </div>
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
