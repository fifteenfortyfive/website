import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { connect } from 'react-redux';

import useAuth from '../../../hooks/useAuth';
import * as AuthActions from '../AuthActions';
import * as AuthStore from '../AuthStore';

import { Columns, Column } from 'bloomer';
import Button from '../../../uikit/Button';
import Header from '../../../uikit/Header';
import PasswordInput from '../../../uikit/PasswordInput';
import TextInput from '../../../uikit/TextInput';
import Layout from '../../layout/components/Layout';
import * as RouterUtils from '../../router/RouterUtils';

import { Routes } from '../../../Constants';

const LoginView = props => {
  const { dispatch } = props;
  const { redirectRoute } = RouterUtils.getSearchParams();

  const { isLoggedIn, isLoaded } = useAuth();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (isLoaded && isLoggedIn) {
      RouterUtils.navigateTo(redirectRoute || Routes.ME, { replace: true });
    }
  }, [isLoaded, isLoggedIn, redirectRoute]);

  const handleLogin = useCallback(() => {
    setFailed(false);
    setSubmitting(true);
    dispatch(AuthActions.login(username, password))
      .then(() => {
        setSubmitting(false);
      })
      .catch(() => {
        setFailed(true);
        setSubmitting(false);
      });
  }, [username, password, dispatch]);

  return (
    <Layout>
      <Columns isCentered>
        <Column isSize={{ fullscreen: 5, desktop: 6, tablet: 7 }}>
          <Header size={Header.Sizes.H1} withMargin>
            Login
          </Header>

          <TextInput label="Username" value={username} onInput={({ target }) => setUsername(target.value)} />
          <PasswordInput label="Password" onInput={({ target }) => setPassword(target.value)} />

          <Button disabled={submitting} color={Button.Colors.PRIMARY} onClick={handleLogin}>
            {submitting ? 'Logging in...' : 'Login'}
          </Button>

          {failed && <p>Couldn't log in :(</p>}
        </Column>
      </Columns>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: AuthStore.isLoggedIn(state),
  };
};

export default connect(mapStateToProps)(LoginView);
