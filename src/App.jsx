import 'bootstrap/dist/css/bootstrap.css';
import 'react-widgets/dist/css/react-widgets.css';

import React, { Component } from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import Moment from 'moment/moment';
import momentLocalizer from 'react-widgets-moment';
import Map from './Map';
import './styles/App.css';
import './styles/Zoom.css';
import environment from './relayEnv';

// needed to render DateTime component
// https://jquense.github.io/react-widgets/localization/
Moment.locale('en');
momentLocalizer();

class App extends Component {
  constructor() {
    super();
    this.state = {
      environment,
    };
  }

  loadRelay() {
    return (
      <QueryRenderer
        environment={this.state.environment}
        query={graphql`
            query AppAllVehiclesQuery($agency: String!, $startTime: String!, $endTime: String!) {
              ...Map_trynState
            }
          `}
        variables={{
          agency: 'muni',
          startTime: Date.now() - 15000,
          endTime: Date.now(),
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <Map trynState={props} />
            );
          }
          return <div>Loading</div>;
        }}
      />
    );
  }

  render() {
    return (
      <div>
        {this.loadRelay()}
      </div>
    );
  }
}

export default App;
