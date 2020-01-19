import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useSelector } from 'react-redux';

import TextInput from '../../../../uikit/TextInput';
import * as SchedulingStore from '../SchedulingStore';
import SchedulingAvailableRun from './SchedulingAvailableRun';

const SchedulingAvailableRuns = props => {
  const [query, setQuery] = useState('');

  const runs = useSelector(state => SchedulingStore.getRunsMatchingQuery(state, { query }));

  return (
    <div>
      <TextInput label="Find Run" value={query} onChange={setQuery} />
      {runs.map(run => (
        <SchedulingAvailableRun key={run.id} runId={run.id} />
      ))}
    </div>
  );
};

export default SchedulingAvailableRuns;
