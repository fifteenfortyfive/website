import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import * as GameActions from '../../games/GameActions';
import * as RunDashboardActions from '../RunDashboardActions';
import * as DashboardStore from '../RunDashboardStore';
import RunDashboardRun from './RunDashboardRun';

import {getUTCNow} from '../../../utils/TimeUtils';

const TICK_INTERVAL = 1000;
const REFRESH_INTERVAL = 15 * 1000;

class RunDashboard extends Component {
  constructor(props) {
    super(props);
    this.timerIntervalID = null;
    this.refreshIntervalID = null;

    this.state = {
      currentTime: getUTCNow()
    };
  }

  componentDidMount() {
    const {dispatch, eventId, accountId} = this.props;
    dispatch(RunDashboardActions.fetchRuns(eventId, accountId));
    dispatch(GameActions.fetchGames());

    this.timerIntervalID = setInterval(() => {
      this.setState({currentTime: getUTCNow()});
    }, TICK_INTERVAL);

    this.timerIntervalID = setInterval(() => {
      dispatch(RunDashboardActions.fetchRuns(eventId, accountId));
    }, REFRESH_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.timerIntervalID);
    clearInterval(this.refreshIntervalID);
  }


  render() {
    const {
      runs,
      eventId
    } = this.props;

    const {
      currentTime
    } = this.state;

    return (
      <div>
        <h1 class="title is-3">Run Dashboard</h1>

        <div class="content">
          <p>These controls are how the main stream knows what to show, so make sure to start and finish your runs! Your run will <em>not</em> automatically start after the previous run for your team. <strong>You must start each of your runs manually when you begin</strong>.</p>
        </div>

        { _.map(runs, (run) => <RunDashboardRun run={run} currentTime={currentTime} eventId={eventId} />) }
      </div>
    );
  }
}

export default connect((state) => {
  return {
    runs: DashboardStore.getOrderedRuns(state),
  };
})(RunDashboard);


