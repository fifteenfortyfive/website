import { h, Fragment } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useDispatch } from 'react-redux';

import useAuth from '../../../hooks/useAuth';
import * as AuthActions from '../AuthActions';

import { Columns, Column } from 'bloomer';
import Button from '../../../uikit/Button';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';
import TextInput from '../../../uikit/TextInput';
import Layout from '../../layout/components/Layout';
import * as RouterUtils from '../../router/RouterUtils';

import { Routes } from '../../../Constants';

export default function ForgotPasswordView() {
  const dispatch = useDispatch();

  const { isLoggedIn, isLoaded } = useAuth();
  const [username, setUsername] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(null);

  useEffect(() => {
    if (isLoaded && isLoggedIn) {
      RouterUtils.navigateTo(Routes.HOME, { replace: true });
    }
  }, [isLoaded, isLoggedIn]);

  const handleRequest = useCallback(() => {
    setSucceeded(null);
    setSubmitting(true);
    dispatch(AuthActions.requestPasswordReset(username))
      .then(() => {
        setSucceeded(true);
        setSubmitting(false);
      })
      .catch(error => {
        console.log(error);
        setSucceeded(false);
        setSubmitting(false);
      });
  }, [username, dispatch]);

  return (
    <Layout>
      <Columns isCentered>
        <Column isSize={{ fullscreen: 5, desktop: 6, tablet: 7 }}>
          <Header size={Header.Sizes.H1} withMargin>
            Forgot Password
          </Header>

          <Text>
            If you have an account but can't remember your password, enter your username to request a password
            reset. Since we don't store any verifiable information, we won't be able to reset your password
            directly. Instead, an organizer will contact you with instructions of how to log in and change
            your password manually.
          </Text>

          {succeeded !== true ? (
            <Fragment>
              <TextInput
                label="Username"
                value={username}
                onInput={({ target }) => setUsername(target.value)}
              />

              <Button
                disabled={succeeded || submitting}
                color={Button.Colors.PRIMARY}
                onClick={handleRequest}>
                {submitting ? 'Submitting Request' : 'Request Password Reset'}
              </Button>
              {succeeded === false && (
                <Text>
                  Something went wrong while submitting your request! Please wait a few seconds before trying
                  again
                </Text>
              )}
            </Fragment>
          ) : (
            <Text>Your request has been sent! An organizer will contact you on Discord soon.</Text>
          )}
        </Column>
      </Columns>
    </Layout>
  );
}
