import { h } from 'preact';

import { Columns, Column } from 'bloomer';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';

import { fullDate } from '../../../utils/TimeUtils';

const EventHeader = props => {
  const { event } = props;

  const { name, series, summary, start_time: startTime } = event;

  return (
    <Columns>
      <Column isSize={2} />
      <Column isSize={8}>
        <Text size={Text.Sizes.SIZE_20} color={Text.Colors.MUTED}>
          {series && series.name.toUpperCase()}
        </Text>
        <Header>{name}</Header>
        <Text size={Text.Sizes.SIZE_16}>Starts {fullDate(startTime)}</Text>
        <Text>{summary}</Text>
      </Column>
    </Columns>
  );
};

export default EventHeader;
