import { h } from 'preact';
import { connect } from 'react-redux';

import Anchor from '../../../uikit/Anchor';
import Header from '../../../uikit/Header';
import Text from '../../../uikit/Text';
import * as EventStore from '../EventStore';

import { Routes } from '../../../Constants';
import style from './EventCard.css';

const EventCard = props => {
  const { event } = props;

  const { name, series, summary } = event;

  return (
    <div class={style.container}>
      <Anchor href={Routes.EVENT(event.id)}>
        <Header size={Header.Sizes.H4} color={Header.Colors.PRIMARY}>
          {series && `${series.name} - `}
          {name}
        </Header>
      </Anchor>
      <Text>{summary}</Text>
    </div>
  );
};

function mapStateToProps(state, props) {
  return {
    event: EventStore.getEvent(state, props),
  };
}

export default connect(mapStateToProps)(EventCard);
