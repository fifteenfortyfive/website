import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import * as AccountPreferencesActions from '../actions/account-preferences';

import Checkbox from '../uikit/checkbox';

class AccountPreferences extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(AccountPreferencesActions.fetchAccountPreferences());
  }

  componentDidUpdate(prevProps) {
    const {submitting} = this.props;
  }

  handleSave() {
    const {preferences, dispatch} = this.props;
    dispatch(AccountPreferencesActions.persistAccountPreferences(preferences));
  }

  handlePreferenceChange(name, value) {
    const {dispatch} = this.props;
    dispatch(AccountPreferencesActions.setPreference(name, value));
  }

  renderPreference(preference, value, detail) {
    const {
      name,
      type,
      requires,
      description
    } = detail;

    return (
      <Checkbox
        className="has-padding-md has-margin-top-sm has-margin-bottom-sm"
        checked={value}
        onChange={(checked) => this.handlePreferenceChange(preference, checked)}
      >
        <h3 class="title is-5 has-margin-top-nudge has-margin-bottom-sm">{name}</h3>
        <p>{description}</p>
      </Checkbox>
    );
  }

  render() {
    const {
      preferences,
      descriptions,
      loading,
      submitting
    } = this.props;

    if(loading) return "Loading...";

    return (
      <div>
        { _.map(preferences, (value, preference) => {
            const detail = descriptions[preference];
            return this.renderPreference(preference, value, detail);
          })
        }

        <div class="has-margin-top-md">
          <button
            class="button is-danger is-medium"
            disabled={submitting}
            onClick={this.handleSave.bind(this)}
          >
            { submitting ? "Submitting..." : "Save Preferences" }
          </button>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  preferences: state.me.preferences,
  descriptions: state.me.preferenceDescriptions,
  loading: state.fetching['@me.account_preferences'],
  submitting: state.fetching['sending.@me.account_preferences']
}), (dispatch) => ({dispatch}))(AccountPreferences);


