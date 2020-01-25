import { h, Component, createRef } from 'preact';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as MeActions from '../MeActions';

import * as RouterUtils from '../../router/RouterUtils';
import Avatar from '../../../uikit/Avatar';
import Button from '../../../uikit/Button';
import TextInput from '../../../uikit/TextInput';

import { Routes } from '../../../Constants';

class MeEdit extends Component {
  constructor(props) {
    super(props);

    this.avatarUploadInput = createRef();
    this.state = {
      avatarChanged: false,
      newAvatarSrc: null,
      avatarChangeFailed: false,
      submitting: false,
      submittingAvatar: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(MeActions.fetchMe());
  }

  handleAvatarChanged = () => {
    const file = this.avatarUploadInput.current.files[0];
    const newAvatarSrc = URL.createObjectURL(file);

    this.setState({
      avatarChanged: true,
      newAvatarSrc,
      avatarChangeFailed: false,
    });
  };

  handleUploadAvatar = () => {
    const { dispatch } = this.props;
    const newAvatar = this.avatarUploadInput.current.files[0];

    this.setState({ submittingAvatar: true });

    dispatch(MeActions.uploadAvatar(newAvatar))
      .then(() => {
        this.setState({ avatarChanged: false, newAvatarSrc: null, submittingAvatar: false });
      })
      .catch(() => {
        this.setState({ avatarChangeFailed: true, submittingAvatar: false });
      });
  };

  handleSave = () => {
    const { account, dispatch, onFinish } = this.props;
    this.setState({ submitting: true });
    dispatch(MeActions.persistMe(account)).then(() => this.setState({ submitting: false }));
    onFinish();
  };

  setDetail(name, value) {
    const { dispatch } = this.props;
    dispatch(MeActions.setAccountDetail(name, value));
  }

  render() {
    const { account, onFinish } = this.props;

    const { avatarChanged, newAvatarSrc, avatarChangeFailed, submitting, submittingAvatar } = this.state;

    if (account == null) return <span>Loading...</span>;

    return (
      <div>
        <h1 class="title is-3">Edit Account</h1>

        <div class="columns is-desktop">
          <div class="column is-4-desktop">
            <div>
              <div>
                {newAvatarSrc ? <Avatar fullSrc={newAvatarSrc} /> : <Avatar src={account.avatar_hash} />}
              </div>

              <div>
                <label class="file-label">
                  <input
                    ref={this.avatarUploadInput}
                    class="file-input"
                    type="file"
                    onChange={this.handleAvatarChanged}
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <FontAwesomeIcon icon="upload" />
                    </span>
                    <span class="file-label">Change Avatar</span>
                  </span>
                </label>
              </div>

              {avatarChanged && (
                <button
                  class="button is-danger is-medium"
                  disabled={submittingAvatar}
                  onClick={this.handleUploadAvatar}>
                  {submittingAvatar ? 'Saving' : 'Save Avatar'}
                </button>
              )}

              {avatarChangeFailed && (
                <div class="is-size-6">
                  <p class="has-text-danger">Failed to save avatar.</p>
                  <p>Avatars must either be JPEG or PNG images, and no larger than 2MB.</p>
                </div>
              )}
            </div>
          </div>

          <div class="column is-8-desktop">
            <div>
              <TextInput
                label="Username"
                value={account.username}
                onInput={({ target }) => this.setDetail('username', target.value)}
              />
              <TextInput
                label="Bio"
                note="Max 140 characters"
                value={account.bio}
                placeholder="1545 Oydssey Advocate"
                onInput={({ target }) => this.setDetail('bio', target.value)}
              />
              <TextInput
                label="Timezone"
                value={account.timezone}
                placeholder="UTC, EST, JST, etc."
                onInput={({ target }) => this.setDetail('timezone', target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <TextInput
            label="Twitch"
            value={account.twitch}
            onInput={({ target }) => this.setDetail('twitch', target.value)}
          />
          <TextInput
            label="Twitter"
            value={account.twitter}
            onInput={({ target }) => this.setDetail('twitter', target.value)}
          />
          <TextInput
            label="Discord Username"
            value={account.discord_username}
            onInput={({ target }) => this.setDetail('discord_username', target.value)}
          />
          <TextInput
            label="Discord Discriminator"
            value={account.discord_discriminator}
            onInput={({ target }) => this.setDetail('discord_discriminator', target.value)}
            pattern="\d{4}"
            maxlength="4"
          />
        </div>

        <div class="field is-grouped">
          <span class="control">
            <Button color={Button.Colors.PRIMARY} disabled={submitting} onClick={this.handleSave}>
              {submitting ? 'Submitting...' : 'Save Changes'}
            </Button>
          </span>
          <span class="control">
            <Button disabled={submitting} onClick={onFinish}>
              Cancel
            </Button>
          </span>
          <span class="control">
            <Button disabled={submitting} onClick={() => RouterUtils.navigateTo(Routes.ME_CHANGE_PASSWORD)}>
              Change Password
            </Button>
          </span>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  account: state.me.account,
}))(MeEdit);
