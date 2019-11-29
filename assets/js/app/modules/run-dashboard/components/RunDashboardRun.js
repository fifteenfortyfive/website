import { h, Component } from 'preact';
import { connect } from 'react-redux';

import * as RunDashboardActions from '../RunDashboardActions';

import { runTime, runTimeFromStart } from '../../../utils/TimeUtils';

class RunDashboardRun extends Component {
  handleStartRun = () => {
    const { dispatch, eventId, runId } = this.props;
    dispatch(RunDashboardActions.startRun(eventId, runId));
  };

  handleFinishRun = () => {
    const { dispatch, eventId, runId } = this.props;
    dispatch(RunDashboardActions.finishRun(eventId, runId));
  };

  handleResumeRun = () => {
    const { dispatch, eventId, runId } = this.props;
    dispatch(RunDashboardActions.resumeRun(eventId, runId));
  };

  handleResetRun = () => {
    const { dispatch, eventId, runId } = this.props;
    if (confirm('Are you sure you want to reset? You cannot go back after resetting.')) {
      dispatch(RunDashboardActions.resetRun(eventId, runId));
    }
  };

  getRunTime(run) {
    const { started_at: startedAt, actual_seconds: actualSeconds } = run;

    if (actualSeconds) {
      return runTime(actualSeconds);
    } else if (startedAt) {
      return runTimeFromStart(startedAt);
    } else {
      return runTime(0);
    }
  }

  getRunState(run) {
    const { started_at: startedAt, actual_seconds: actualSeconds } = run;

    if (actualSeconds) {
      return 'finished';
    } else if (startedAt) {
      return 'running';
    } else {
      return 'ready';
    }
  }

  render() {
    const { game, run } = this.props;

    const { index, est_seconds: estSeconds, actual_seconds: actualSeconds, started_at: startedAt } = run;

    return (
      <div>
        <hr />
        <h1 class="title is-4">
          Run #{index}: {game && game.name}
        </h1>

        <div
          class="is-flex-tablet"
          style={{
            width: '100%',
            flexDirection: 'reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <div>
            <p class="is-marginless is-uppercase has-text-weight-bold">{this.getRunState(run)}</p>
            <p class="is-marginless is-size-1">{this.getRunTime(run)}</p>
            <p class="is-marginless is-size-5">Estimate: {runTime(estSeconds)}</p>
          </div>

          <div>
            <div class="field is-grouped">
              <p class="control">
                <button class="button is-info" disabled={startedAt} onClick={this.handleStartRun}>
                  Start Run
                </button>
              </p>
              <p class="control">
                <button
                  class="button is-success"
                  disabled={!startedAt || actualSeconds}
                  onClick={this.handleFinishRun}>
                  Finish Run
                </button>
              </p>
              <p class="control">
                <button class="button is-default" disabled={!actualSeconds} onClick={this.handleResumeRun}>
                  Resume Run
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" disabled={!startedAt} onClick={this.handleResetRun}>
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
  const { run } = props;

  return {
    runId: run.id,
    game: state.games[run.game_id],
  };
})(RunDashboardRun);
