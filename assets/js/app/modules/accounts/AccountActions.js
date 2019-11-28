import { commonThunk, denulled } from '../../Actions';

export function fetchAccounts(accountIds) {
  return commonThunk(
    {
      method: 'get',
      path: '/api/v1/accounts',
      name: 'accounts',
      query: denulled({
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
        discord_username: discordUsername,
        discord_discriminator: discordDiscriminator,
      },
    },
    (dispatch, response) => {
      dispatch(receiveAccounts([response.account]));
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
