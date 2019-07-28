import {h} from 'preact';
import {connect} from 'react-redux';
import {Link} from 'preact-router';

import * as EventStore from '../../selectors/events';
import Header from '../../uikit/header';

import {Routes} from '../../constants';
import style from './event-card.css';


const EventCard = (props) => {
  const {
    event
  } = props;

  const {
    name,
    series,
    summary
  } = event;

  return (
    <div class={style.container}>
      <Link href={Routes.EVENT(event.id)}>
        <Header size={Header.Sizes.H4} color={Header.Colors.PRIMARY}>{name}</Header>
      </Link>
      <p class="subtitle">{summary}</p>
    </div>
  );
};

function mapStateToProps(state, props) {
  return {
    event: EventStore.getEvent(state, props),
  };
}

export default connect(
  mapStateToProps
)(EventCard);
