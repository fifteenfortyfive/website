import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { connect } from 'react-redux';
import { route } from 'preact-router';
import _ from 'lodash';

import * as AuthActions from '../actions/auth';
import * as AuthStore from '../selectors/auth';
import Button from '../uikit/button';
import Header from '../uikit/header';
import Link from '../uikit/link';
import PasswordInput from '../uikit/password-input';
import TextInput from '../uikit/text-input';
import Layout from './layout';

import { Routes } from '../constants';


const LoginPage = (props) => {
  const {isLoggedIn, redirectRoute} = props;

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if(props.isLoggedIn) {
      route(props.redirectRoute || Routes.ME);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    const {dispatch} = props;

    dispatch(AuthActions.login(username, password))
        .then(() => {
          route(props.redirectRoute || Routes.ME);
        });
  }

  return (
    <Layout>
      <Header size={Header.Sizes.H1}>Login</Header>

      <TextInput
        label="Username"
        value={username}
        onInput={({target}) => setUsername(target.value)}
      />
      <PasswordInput
        label="Password"
        value={password}
        onInput={({target}) => setPassword(target.value)}
      />

      <Button color={Button.Colors.PRIMARY} onClick={handleLogin}>
        Login
      </Button>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: AuthStore.isLoggedIn(state)
  };
}

export default connect(
  mapStateToProps,
)(LoginPage);
