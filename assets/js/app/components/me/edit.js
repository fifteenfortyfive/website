import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import * as MeActions from '../../actions/me';

import Checkbox from '../../uikit/checkbox';
import TextInput from '../../uikit/text-input';
import PasswordInput from '../../uikit/password-input';

class Edit extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(MeActions.fetchMe());
  }

  componentDidUpdate(prevProps) {
    const {submitting} = this.props;
  }

  handleSave() {
    const {account, dispatch, onFinish} = this.props;
    dispatch(MeActions.persistMe(account));
    onFinish();
  }

  setDetail(name, value) {
    const {dispatch} = this.props;
    dispatch(MeActions.setAccountDetail(name, value));
  }

  render() {
    const {
      account,
      loading,
      submitting,
      onFinish
    } = this.props;

    if(loading) return "Loading...";

    return (
      <div>
        <h1 class="title is-3">Edit Account</h1>

        <div class="has-margin-bottom-lg">
          <TextInput
            label="Username"
            value={account.username}
            onInput={({target}) => this.setDetail("username", target.value)}
          />
          <TextInput
            label="Bio (Max 140 characters)"
            value={account.bio}
            placeholder="1545 Oydssey Advocate"
            onInput={({target}) => this.setDetail("bio", target.value)}
          />
          <TextInput
            label="Timezone"
            value={account.timezone}
            placeholder="UTC, EST, JST, etc."
            onInput={({target}) => this.setDetail("timezone", target.value)}
          />
        </div>


        <div class="has-margin-bottom-lg">
          <TextInput
            label="Twitch"
            value={account.twitch}
            onInput={({target}) => this.setDetail("twitch", target.value)}
          />
          <TextInput
            label="Twitter"
            value={account.twitter}
            onInput={({target}) => this.setDetail("twitter", target.value)}
          />
          <TextInput
            label="Discord Username"
            value={account.discord_username}
            onInput={({target}) => this.setDetail("discord_username", target.value)}
          />
          <TextInput
            label="Discord Discriminator"
            value={account.discord_discriminator}
            onInput={({target}) => this.setDetail("discord_discriminator", target.value)}
            pattern="\d{4}"
            maxlength="4"
          />
        </div>

        <div class="field is-grouped has-margin-top-md">
          <span class="control">
            <button
              class="button is-danger is-medium"
              disabled={submitting}
              onClick={this.handleSave.bind(this)}
            >
              { submitting ? "Submitting..." : "Save Changes" }
            </button>
          </span>
          <span class="control">
            <button
              class="button is-light is-medium"
              disabled={submitting}
              onClick={onFinish}
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  account: state.me.account,
  loading: state.fetching['@me.account'],
  submitting: state.fetching['sending.@me.account']
}), (dispatch) => ({dispatch}))(Edit);


