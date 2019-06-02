import { h, Component } from 'preact';
import Duration from 'luxon/src/duration';


const RunnerCell = (props) => {
  const {
    runner,
    submission
  } = props;

  return (
    <div>
      <strong>{runner.username}</strong>
      <br />
      { submission.max_games || submission.max_time
        ? <small>{submission.max_games || "Any"} Games / {submission.max_time || "Any Time"}</small>
        : <small class="has-text-grey-light">No limits</small>
      }
    </div>
  );
};

export default RunnerCell;
