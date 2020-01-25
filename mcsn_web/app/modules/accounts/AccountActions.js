import { commonThunk, denulled } from '../../Actions';
import * as AuthActions from '../auth/AuthActions';

export function fetchAccounts(accountIds) {
  return commonThunk(
    {
      method: 'get',
      path: '/api/v1/accounts',
      name: 'accounts',
      query: denulled({
        // eslint-disable-next-line camelcase
        account_ids: accountIds,
      }),
    },
    (dispatch, response) => {
      dispatch(receiveAccounts(response.accounts));
    }
  );
}

export function fetchAccount(accountId) {
  return commonThunk(
    {
      method: 'get',
      path: `/api/v1/accounts/${accountId}`,
      name: `accounts.${accountId}`,
      query: denulled({
        embed: 'runs',
      }),
    },
    (dispatch, response) => {
      dispatch(receiveAccounts([response.account]));
    }
  );
}

export function createAccount(accountProps) {
  const { username, password, discordUsername, discordDiscriminator } = accountProps;

  return commonThunk(
    {
      method: 'post',
      path: '/api/v1/accounts/create',
      name: 'accounts.create',
      body: {
        username,
        password,
        /* eslint-disable camelcase */
        discord_username: discordUsername,
        discord_discriminator: discordDiscriminator,
        /* eslint-enable camelcase */
      },
    },
    (dispatch, response) => {
      dispatch(AuthActions.loginSuccess(response.session_id));
    }
  );
}

export function receiveAccounts(accounts) {
  return {
    type: 'RECEIVE_ACCOUNTS',
    data: {
      accounts,
    },
  };
}
