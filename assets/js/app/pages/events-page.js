import { h, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as EventActions from '../actions/events';
import * as EventStore from '../selectors/events';


class EventsPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(EventActions.fetchEvents());
  }

  render() {
    const {events} = this.props;

    return (
      <div class="container">
        <section class="section">
          <h1 class="title">Events</h1>

          { _.map(events, (event) => {
              return (
                <div>
                  <h2>{event.name}</h2>
                </div>
              );
            })
          }
        </section>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    events: EventStore.getSortedEvents(state, props),
  };
}

export default connect(
  mapStateToProps,
)(EventsPage);
