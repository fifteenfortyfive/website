import { h, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as MeActions from '../MeActions';

import Button from '../../../uikit/Button';
import Checkbox from '../../../uikit/Checkbox';

class MePreferences extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(MeActions.fetchPreferences());
  }

  handleSave() {
    const { preferences, dispatch, onFinish } = this.props;
    dispatch(MeActions.persistPreferences(preferences));
    onFinish();
  }

  handlePreferenceChange(name, value) {
    const { dispatch } = this.props;
    dispatch(MeActions.setPreference(name, value));
  }

  renderPreference(preference, value, detail) {
    const { preferences, descriptions } = this.props;
    const { name, requires, description } = detail;

    const requirements = _.flow([
      _.partialRight(_.map, pref => descriptions[pref].name),
      _.partialRight(_.join, ', '),
    ])(requires);
    const requirementsMet = _.every(requires, pref => preferences[pref]);

    return (
      <Checkbox
        key={name}
        checked={requirementsMet && value}
        disabled={!requirementsMet}
        marginless
        onChange={checked => this.handlePreferenceChange(preference, checked)}>
        <Checkbox.Header>{name}</Checkbox.Header>
        <p>{description}</p>
        {requires && <p class="is-size-6 has-text-grey">Requires: {requirements}</p>}
      </Checkbox>
    );
  }

  render() {
    const { preferences, descriptions, loading, submitting, onFinish } = this.props;

    if (loading) return 'Loading...';

    return (
      <div>
        <h1 class="title is-3">Account Preferences</h1>
        {_.map(preferences, (value, preference) => {
          const detail = descriptions[preference];
          return this.renderPreference(preference, value, detail);
        })}

        <div class="field is-grouped">
          <span class="control">
            <Button color={Button.Colors.PRIMARY} disabled={submitting} onClick={this.handleSave.bind(this)}>
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
    preferences: state.me.preferences,
    descriptions: state.me.preferenceDescriptions,
    loading: state.fetching['@me.account_preferences'],
    submitting: state.fetching['sending.@me.account_preferences'],
  }),
  dispatch => ({ dispatch })
)(MePreferences);
