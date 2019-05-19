import { h, render } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserInfo = (props) => {
  const {
    user
  } = props;
  const {
    username,
    twitter,
    twitch,
    discord_username,
    discord_discriminator
  } = user;

  const discord = `${discord_username}#${discord_discriminator}`;

  return (
    <div class="user-info has-margin-bottom-md">
      <p>
        You are currently logged in and submitting as <b>{username}</b>. Below are the social links you have provided as part of your account.
      </p>

      <div class="field">
        <div class="control is-oneline is-rounded">
          <label class="label">Twitter</label>
          <div class="prefix is-icon">
            <FontAwesomeIcon icon="lock" />
          </div>
          <input class="input" value={twitter} disabled />
        </div>
      </div>

      <div class="field">
        <div class="control is-oneline is-rounded">
          <label class="label">Twitch</label>
          <div class="prefix is-icon">
            <FontAwesomeIcon icon="lock" />
          </div>
          <input class="input" value={twitch} disabled />
        </div>
      </div>

      <div class="field">
        <div class="control is-oneline is-rounded">
          <label class="label">Discord</label>
          <div class="prefix is-icon">
            <FontAwesomeIcon icon="lock" />
          </div>
          <input class="input" value={discord} disabled />
        </div>
      </div>

      <p>
        Please make sure this information is up-to-date at the time of submission. To edit this information, go to <a href="/accounts/edit">Edit Account</a>.
      </p>
      <p>
        Twitch information is required, providing a Twitter account will allow us to include you in posts regarding your runs during the event, and Your Discord information is only used for emergency contact regarding The 1545. Discord information will never be made public.
      </p>
    </div>
  );
};

export default UserInfo;
