import {h} from 'preact';

import {Columns, Column} from 'bloomer';
import Header from '../../uikit/header';
import Text from '../../uikit/text';

import {fullDate} from '../../util';

const EventHeader = (props) => {
  const {
    event
  } = props;

  const {
    name,
    series,
    summary,
    start_time
  } = event;

  return (
    <Columns>
      <Column isSize={2} />
      <Column isSize={8}>
        <Text size={Text.Sizes.SIZE_20} color={Text.Colors.MUTED}>
          { series && series.name.toUpperCase() }
        </Text>
        <Header>{name}</Header>
        <Text size={Text.Sizes.SIZE_16}>
          Starts {fullDate(start_time)}
        </Text>
        <Text>
          {summary}
        </Text>
      </Column>
    </Columns>
  );
}

export default EventHeader;
