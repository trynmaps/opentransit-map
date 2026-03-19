import 'bootstrap/dist/css/bootstrap.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'react-toggle/style.css';

import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import Moment from 'moment/moment';
import momentLocalizer from 'react-widgets-moment';
import Map from './components/Map';
import './styles/App.css';
import './styles/Zoom.css';
import environment from './relayEnv';

Moment.locale('en');
momentLocalizer();

class App extends Component {
  constructor() {
    super();
    this.state = {
      environment,
      agency: 'muni', // ✅ default agency in state
    };
  }

  handleAgencyChange = (selectedAgency) => {
    this.setState({ agency: selectedAgency }); // ✅ triggers re-query
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
          agency: this.state.agency, // ✅ dynamic, not hardcoded
          startTime: Date.now() - 15000,
          endTime: Date.now(),
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          }
          return (
            <div>
              {props && (
                <Map
                  trynState={props}
                  onAgencyChange={this.handleAgencyChange}
                />
              )}
            </div>
          );
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