import React, { Component } from 'react';
import {
  graphql,
  createFragmentContainer,
} from 'react-relay';
import propTypes from 'prop-types';

class Routes extends Component {
  render() {
    return this.props.state.routes.map(route => (
      <div>
        Route {route.name} has {route.vehicles.length} vehicles running right now
      </div>
    ));
  }
}

Routes.propTypes = {
  state: propTypes.shape(
    propTypes.string,
    propTypes.arrayOf(propTypes.object),
  ).isRequired,
};

export default createFragmentContainer(
  Routes,
  graphql`
    fragment Routes_state on State {
      routes {
        name
        vehicles {
          vid
          lat
          lon
          heading
        }
      }
    }
  `,
);
