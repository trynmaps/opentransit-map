import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import Map from './Map';
import './styles/App.css';
import './styles/Zoom.css';
import environment from './relayEnv';

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
              trynState(agency: $agency, startTime: $startTime, endTime: $endTime) {
                ...Map_trynState
              }
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
              <Map trynState={props.trynState} />
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
