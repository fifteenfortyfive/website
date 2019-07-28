import {h} from 'preact';
import {connect} from 'react-redux';
import {Link} from 'preact-router';

import * as EventStore from '../../selectors/events';
import Header from '../../uikit/header';

const EventCard = (props) => {
  const {
    event
  } = props;

  const {
    name,
    series
  } = event;

  return (
    <div>
      <Header size={Header.Sizes.H4} color={Header.Colors.DEFAULT}>{name}</Header>
      { series &&
        <p class="subtitle">{series.name}</p>
      }
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
