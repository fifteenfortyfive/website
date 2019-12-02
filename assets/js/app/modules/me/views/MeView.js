import { h, Component } from 'preact';
import { connect } from 'react-redux';

import Button from '../../../uikit/Button';
import AccountCard from '../../accounts/components/AccountCard';
import Layout from '../../layout/components/Layout';
import * as RouterUtils from '../../router/RouterUtils';
import RunDashboard from '../../run-dashboard/components/RunDashboard';
import * as MeActions from '../MeActions';
import Edit from '../components/MeEdit';
import Preferences from '../components/MePreferences';

import { Routes } from '../../../Constants';

const Pages = {
  SHOW: 'show',
  EDIT: 'edit',
  PREFERENCES: 'preferences',
  RUN_DASHBOARD: 'run-dashboard',
};

class MeView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(MeActions.fetchMe());
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch, page } = this.props;
    const pageChanged = prevState.page !== page;

    if (pageChanged && page === Pages.SHOW) {
      dispatch(MeActions.fetchMe());
    }
  }

  renderNav() {
    const { account } = this.props;
    const accountId = account && account.id;
    return (
      <div>
        {accountId && (
          <Button fullwidth onClick={() => RouterUtils.navigateTo(Routes.ACCOUNT(accountId))}>
            View Public Profile
          </Button>
        )}

        <div>
          <Button
            color={Button.Colors.PRIMARY}
            fullwidth
            onClick={() => RouterUtils.navigateTo(Routes.ME_RUN_DASHBOARD)}>
            Run Dashboard
          </Button>

          <Button fullwidth onClick={() => RouterUtils.navigateTo(Routes.ME_PREFERENCES)}>
            Edit Preferences
          </Button>

          <Button fullwidth onClick={() => RouterUtils.navigateTo(Routes.ME_EDIT)}>
            Edit Account
          </Button>
        </div>
      </div>
    );
  }

  renderPageBody() {
    const { accountId, eventId, page } = this.props;

    switch (page) {
      case Pages.PREFERENCES:
        return <Preferences onFinish={() => RouterUtils.navigateTo(Routes.ME)} />;
      case Pages.RUN_DASHBOARD:
        return <RunDashboard eventId={eventId} accountId={accountId} />;
      case Pages.EDIT:
        return <Edit onFinish={() => RouterUtils.navigateTo(Routes.ME)} />;
      case Pages.SHOW:
      default:
        return <div>Hi there's nothing here yet</div>;
    }
  }

  render() {
    const { account, loadingAccount } = this.props;

    if (account == null) return <Layout>Loading</Layout>;

    return (
      <Layout>
        <div class="columns">
          <div class="column is-4-tablet is-4-desktop is-3-widescreen">
            <AccountCard account={account} loading={loadingAccount} />

            {this.renderNav()}
          </div>

          <div class="column is-8">{this.renderPageBody()}</div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const accountId = state.me.account && state.me.account.id;

  return {
    accountId,
    account: state.me.account,
    loadingAccount: state.fetching[`accounts.${accountId}`],
  };
};

export default connect(mapStateToProps)(MeView);
