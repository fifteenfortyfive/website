import { h } from 'preact';
import { useSelector } from 'react-redux';

import * as SchedulingStore from '../SchedulingStore';
import SchedulingAvailableRun from './SchedulingAvailableRun';

const SchedulingAvailableRuns = props => {
  const runs = useSelector(SchedulingStore.getRuns);

  return (
    <div>
      {runs.map(run => (
        <SchedulingAvailableRun key={run.id} runId={run.id} />
      ))}
    </div>
  );
};

export default SchedulingAvailableRuns;
