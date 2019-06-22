import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import * as MeActions from '../../actions/me';

import Checkbox from '../../uikit/checkbox';

class Preferences extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(MeActions.fetchPreferences());
  }

  componentDidUpdate(prevProps) {
    const {submitting} = this.props;
  }

  handleSave() {
    const {preferences, dispatch, onFinish} = this.props;
    dispatch(MeActions.persistPreferences(preferences));
    onFinish();
  }

  handlePreferenceChange(name, value) {
    const {dispatch} = this.props;
    dispatch(MeActions.setPreference(name, value));
  }

  renderPreference(preference, value, detail) {
    const { preferences, descriptions } = this.props;
    const {
      name,
      type,
      requires,
      description
    } = detail;

    const requirements = _.chain(requires)
        .map((pref) => descriptions[pref].name)
        .join(", ")
        .value();
    const requirementsMet = _.every(requires, (pref) => preferences[pref]);

    return (
      <Checkbox
        className="has-padding-md has-margin-top-sm has-margin-bottom-sm"
        checked={requirementsMet && value}
        disabled={!requirementsMet}
        onChange={(checked) => this.handlePreferenceChange(preference, checked)}
        header={name}
      >
        <p>{description}</p>
        { requires &&
          <p class="is-size-6 has-text-grey has-margin-top-xs">
            Requires: {requirements}
          </p>
        }
      </Checkbox>
    );
  }

  render() {
    const {
      preferences,
      descriptions,
      loading,
      submitting,
      onFinish
    } = this.props;

    if(loading) return "Loading...";

    return (
      <div>
        <h1 class="title is-3">Account Preferences</h1>
        { _.map(preferences, (value, preference) => {
            const detail = descriptions[preference];
            return this.renderPreference(preference, value, detail);
          })
        }

        <div class="field is-grouped has-margin-top-md">
          <span class="control">
            <button
              class="button is-danger is-medium"
              disabled={submitting}
              onClick={this.handleSave.bind(this)}
            >
              { submitting ? "Submitting..." : "Save Preferences" }
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
  preferences: state.me.preferences,
  descriptions: state.me.preferenceDescriptions,
  loading: state.fetching['@me.account_preferences'],
  submitting: state.fetching['sending.@me.account_preferences']
}), (dispatch) => ({dispatch}))(Preferences);


