import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Button from '../../../uikit/Button';
import AccountCard from '../../accounts/components/AccountCard';
import Layout from '../../layout/components/Layout';
import * as RouterUtils from '../../router/RouterUtils';
import RunDashboard from '../../run-dashboard/components/RunDashboard';
import * as MeActions from '../MeActions';
import ChangePassword from '../components/MeChangePassword';
import Edit from '../components/MeEdit';
import Preferences from '../components/MePreferences';

import { Routes } from '../../../Constants';

class MeView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(MeActions.fetchMe());
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

  render() {
    const { account, accountId, eventId, loadingAccount } = this.props;

    if (account == null) return <Layout>Loading</Layout>;

    return (
      <Layout>
        <div class="columns">
          <div class="column is-4-tablet is-4-desktop is-3-widescreen">
            <AccountCard account={account} loading={loadingAccount} />

            {this.renderNav()}
          </div>

          <div class="column is-8">
            <Switch>
              <Route path={Routes.ME} exact>
                <div>Hi there's nothing here yet</div>
              </Route>
              <Route path={Routes.ME_PREFERENCES} exact>
                <Preferences onFinish={() => RouterUtils.navigateTo(Routes.ME)} />
              </Route>
              <Route path={Routes.ME_RUN_DASHBOARD} exact>
                <RunDashboard eventId={eventId} accountId={accountId} />
              </Route>
              <Route path={Routes.ME_EDIT} exact>
                <Edit onFinish={() => RouterUtils.navigateTo(Routes.ME)} />
              </Route>
              <Route path={Routes.ME_CHANGE_PASSWORD} exact>
                <ChangePassword onFinish={() => RouterUtils.navigateTo(Routes.ME)} />
              </Route>
            </Switch>
          </div>
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
