import { h } from 'preact';

const RunnerCell = props => {
  const { runner, submission } = props;

  return (
    <div>
      <strong>{runner.username}</strong>
      <br />
      {submission.captain && <small class="has-text-grey-light">Willing to be Captain</small>}
    </div>
  );
};

export default RunnerCell;
