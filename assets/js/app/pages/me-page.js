import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { route } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as AccountActions from '../actions/accounts';
import * as StreamActions from '../actions/streams';
import * as MeActions from '../actions/me';
import Edit from '../components/me/edit';
import Preferences from '../components/me/preferences';
import RunDashboard from '../components/me/run-dashboard';
import AccountCard from '../components/accounts/account-card';
import RunList from '../components/accounts/run-list';
import Button from '../uikit/button';
import Layout from './layout';

import { Routes } from '../constants';

const Pages = {
  SHOW: 'show',
  EDIT: 'edit',
  PREFERENCES: 'preferences',
  RUN_DASHBOARD: 'run-dashboard'
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
          <Button
              fullwidth
              onClick={() => route(Routes.ACCOUNT(accountId))}
            >
            View Public Profile
          </Button>
        }

        <div>
          <Button
              color={Button.Colors.PRIMARY}
              fullwidth
              onClick={() => route(Routes.ME_RUN_DASHBOARD)}
            >
            Run Dashboard
          </Button>

          <Button
              fullwidth
              onClick={() => route(Routes.ME_PREFERENCES)}
            >
            Edit Preferences
          </Button>

          <Button
              fullwidth
              onClick={() => route(Routes.ME_EDIT)}
            >
            Edit Account
          </Button>
        </div>
      </div>
    );
  }

  renderPageBody() {
    const {accountId, eventId, page} = this.props;

    switch(page) {
      case Pages.PREFERENCES:
        return (
          <Preferences onFinish={() => route(Routes.ME)} />
        );
      case Pages.RUN_DASHBOARD:
        return (
          <RunDashboard eventId={eventId} accountId={accountId} eventId={eventId} />
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
      <Layout>
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
      </Layout>
    );
  }
};

const mapStateToProps = (state) => {
  const accountId = state.me.account && state.me.account.id;

  return {
    accountId,
    account: state.me.account,
    loadingAccount: state.fetching[`accounts.${accountId}`]
  };
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MePage);
