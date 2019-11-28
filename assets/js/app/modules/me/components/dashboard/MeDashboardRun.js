import { h, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as RunDashboardActions from '../../../../actions/run-dashboard';

import {runTime, runTimeFromStart} from '../../../../util';

class MeDashboardRun extends Component {
  constructor(props) {
    super(props);
    this.handleStartRun  = this._handleStartRun.bind(this);
    this.handleFinishRun = this._handleFinishRun.bind(this);
    this.handleResetRun  = this._handleResetRun.bind(this);
    this.handleResumeRun = this._handleResumeRun.bind(this);
  }

  _handleStartRun() {
    const {dispatch, eventId, runId} = this.props;
    dispatch(RunDashboardActions.startRun(eventId, runId));
  }

  _handleFinishRun() {
    const {dispatch, eventId, runId} = this.props;
    dispatch(RunDashboardActions.finishRun(eventId, runId));
  }

  _handleResumeRun() {
    const {dispatch, eventId, runId} = this.props;
    dispatch(RunDashboardActions.resumeRun(eventId, runId));
  }

  _handleResetRun() {
    const {dispatch, eventId, runId} = this.props;
    if(confirm("Are you sure you want to reset? You cannot go back after resetting.")) {
      dispatch(RunDashboardActions.resetRun(eventId, runId));
    }
  }

  getRunTime(run) {
    const {
      started_at,
      actual_seconds
    } = run;

    if(actual_seconds) {
      return runTime(actual_seconds);
    } else if(started_at) {
      return runTimeFromStart(started_at);
    } else {
      return runTime(0);
    }
  }

  getRunState(run) {
    const {
      started_at,
      actual_seconds
    } = run;

    if(actual_seconds) {
      return "finished";
    } else if(started_at) {
      return "running";
    } else {
      return "ready";
    }
  }

  render() {
    const {
      game,
      run,
      runId,
      eventId,
    } = this.props;

    const {
      index,
      pb_seconds,
      est_seconds,
      started_at,
      actual_seconds
    } = run;

    return (
      <div>
        <hr/>
        <h1 class="title is-4">Run #{index}: {game && game.name}</h1>

        <div class="is-flex-tablet" style={{width: "100%", flexDirection: "reverse", alignItems: "center", justifyContent: "space-between"}}>
          <div>
            <p class="is-marginless is-uppercase has-text-weight-bold">{this.getRunState(run)}</p>
            <p class="is-marginless is-size-1">{this.getRunTime(run)}</p>
            <p class="is-marginless is-size-5">Estimate: {runTime(est_seconds)}</p>
          </div>

          <div>

            <div class="field is-grouped">
              <p class="control">
                <button
                    class="button is-info"
                    disabled={run.started_at}
                    onClick={this.handleStartRun}
                  >
                  Start Run
                </button>
              </p>
              <p class="control">
                <button
                    class="button is-success"
                    disabled={!run.started_at || run.actual_seconds}
                    onClick={this.handleFinishRun}
                  >
                  Finish Run
                </button>
              </p>
              <p class="control">
                <button
                    class="button is-default"
                    disabled={!run.actual_seconds}
                    onClick={this.handleResumeRun}
                  >
                  Resume Run
                </button>
              </p>
              <p class="control">
                <button
                    class="button is-danger"
                    disabled={!run.started_at}
                    onClick={this.handleResetRun}
                  >
                  Reset Run
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, props) => {
  const {run} = props;

  return {
    runId: run.id,
    game: state.games[run.game_id]
  };
})(MeDashboardRun);


