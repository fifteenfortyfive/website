import { h, Component, createRef } from 'preact';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import * as MeActions from '../MeActions';

import Avatar from '../../../uikit/Avatar';
import Button from '../../../uikit/Button';
import Checkbox from '../../../uikit/Checkbox';
import TextInput from '../../../uikit/TextInput';
import PasswordInput from '../../../uikit/PasswordInput';

class MeEdit extends Component {
  constructor(props) {
    super(props);

    this.handleSave = this._handleSave.bind(this);
    this.handleUploadAvatar = this._handleUploadAvatar.bind(this);
    this.stageAvatarUpload = this._stageAvatarUpload.bind(this);

    this.avatarUploadInput = createRef();

    this.state = {
      avatarChanged: false,
      newAvatarSrc: null,
      avatarChangeFailed: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(MeActions.fetchMe());
  }

  componentDidUpdate(prevProps) {
    const { submitting } = this.props;
  }

  _stageAvatarUpload() {
    const file = this.avatarUploadInput.current.files[0];
    const newAvatarSrc = URL.createObjectURL(file);

    this.setState({
      avatarChanged: true,
      newAvatarSrc,
      avatarChangeFailed: false,
    });
  }

  _handleUploadAvatar() {
    const { dispatch } = this.props;
    const newAvatar = this.avatarUploadInput.current.files[0];

    dispatch(MeActions.uploadAvatar(newAvatar))
      .then(() => {
        this.setState({ avatarChanged: false, newAvatarSrc: null });
      })
      .catch(() => {
        this.setState({ avatarChangeFailed: true });
      });
  }

  _handleSave() {
    const { account, dispatch, onFinish } = this.props;
    dispatch(MeActions.persistMe(account));
    onFinish();
  }

  setDetail(name, value) {
    const { dispatch } = this.props;
    dispatch(MeActions.setAccountDetail(name, value));
  }

  render() {
    const { account, loading, submitting, submittingAvatar, onFinish } = this.props;

    const { avatarChanged, newAvatarSrc, avatarChangeFailed } = this.state;

    if (loading) return 'Loading...';

    return (
      <div>
        <h1 class="title is-3">Edit Account</h1>

        <div class="columns is-desktop">
          <div class="column is-4-desktop">
            <div class="has-margin-bottom-lg">
              <div class="has-padding-md">
                {newAvatarSrc ? <Avatar fullSrc={newAvatarSrc} /> : <Avatar src={account.avatar_hash} />}
              </div>

              <div>
                <label class="file-label">
                  <input
                    ref={this.avatarUploadInput}
                    class="file-input"
                    type="file"
                    onChange={this.stageAvatarUpload}
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <FontAwesomeIcon icon="upload" />
                    </span>
                    <span class="file-label">Choose a new Avatar...</span>
                  </span>
                </label>
              </div>

              {avatarChanged && (
                <button
                  class="button is-danger is-medium has-margin-top-sm has-margin-bottom-sm"
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
            <div class="has-margin-bottom-lg">
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

        <div class="has-margin-bottom-lg">
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

        <div class="field is-grouped has-margin-top-md">
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
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    account: state.me.account,
    loading: state.fetching['@me.account'],
    submitting: state.fetching['sending.@me.account'],
    submittingAvatar: state.fetching['sending.@me.avatar'],
  }),
  dispatch => ({ dispatch }),
)(MeEdit);
