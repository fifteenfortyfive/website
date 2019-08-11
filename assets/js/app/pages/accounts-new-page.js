import {h} from 'preact';
import {useCallback, useEffect, useState} from 'preact/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {route} from 'preact-router';

import * as AccountActions from '../actions/accounts';
import * as AuthStore from '../selectors/auth';
import Layout from './layout';

import {
  Columns,
  Column,
} from 'bloomer';
import Button from '../uikit/button';
import Header from '../uikit/header';
import Text from '../uikit/text';
import TextInput from '../uikit/text-input';
import PasswordInput from '../uikit/password-input';

import {Routes} from '../constants';

const NewAccountPage = (props) => {
  const isLoggedIn = useSelector(AuthStore.isLoggedIn);

  useEffect(() => {
    if(props.isLoggedIn) {
      route(props.redirectRoute || Routes.ME);
    }
  }, [isLoggedIn]);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [discordUsername, setDiscordUsername] = useState();
  const [discordDiscriminator, setDiscordDiscriminator] = useState();
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
      (username && username.length > 2) &&
      (password && password.length > 2) &&
      (discordUsername && discordUsername.length > 2) &&
      (discordDiscriminator
        && discordDiscriminator.length == 4
        && parseInt(discordDiscriminator)
      );

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    if(submitting || !canSubmit) return;

    setSubmitting(true);
    dispatch(AccountActions.createAccount({
      username,
      password,
      discordUsername,
      discordDiscriminator
    })).then(() => {
      setSubmitting(false);
      route(Routes.ME);
    }).catch(() => {
      setSubmitting(false);
    });
  }, [username, password, discordUsername, discordDiscriminator, canSubmit, submitting, dispatch]);


  return (
    <Layout>
      <Columns isCentered>
        <Column isSize={{fullscreen: 6, desktop: 10, tablet: 12}}>
          <Header size={Header.Sizes.H1} withMargin>Create an Account</Header>

          <TextInput
            label="Username"
            value={username}
            onInput={({target}) => setUsername(target.value)}
          />

          <PasswordInput
            label="Password"
            onInput={({target}) => setPassword(target.value)}
          />

          <TextInput
            label="Discord Username"
            value={discordUsername}
            onInput={({target}) => setDiscordUsername(target.value)}
          />
          <TextInput
            label="Discord Discriminator"
            value={discordDiscriminator}
            placeholder="0000"
            pattern="\\d{4}"
            maxlength="4"
            onInput={({target}) => setDiscordDiscriminator(target.value)}
          />

          <Button onClick={handleSubmit} color={Button.Colors.PRIMARY} disabled={submitting || !canSubmit}>
            { submitting ? "Submitting" : "Sign Up" }
          </Button>

          <Text>
            We use profiles to track submissions and runs, and to create a profile page to display during the event. You'll also be able to log in and edit your information (including submissions, PBs, and estimates) and preferences at any point later on.
          </Text>

          <Text>
            We use Discord as our primary means of communication. As such, we need your full username (name and the numbers after it) to make sure we're able to contact you directly if needed and ensure that we are reaching the right person.
          </Text>

          <Text>
            This information is private-by-default, but you can choose to display it publicly under your account preferences.
          </Text>
        </Column>
      </Columns>
    </Layout>
  );
};

export default NewAccountPage;
