import React, { Component } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import {
  QueryRenderer,
  graphql,
  // createFragmentContainer,
} from 'react-relay';

import logo from './res/logo.svg';
import './styles/App.css';
import './styles/Zoom.css';
import { MAPBOX_ACCESS_TOKEN } from './config.json';
import muniRoutesGeoJson from './res/muniRoutes.geo.json';
import environment from './relayEnv';

const routesLayer = new GeoJsonLayer({
  id: 'muni-routes-geojson',
  data: muniRoutesGeoJson,
  filled: true,
  stroked: false,
  extruded: true,
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Viewport settings that is shared between mapbox and deck.gl
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        longitude: -122.41669,
        latitude: 37.7853,
        zoom: 15,
        pitch: 0,
        bearing: 0,
      },
      settings: {
        dragPan: true,
        // dragRotate: true,
        // scrollZoom: true,
        // touchZoomRotate: true,
        // doubleClickZoom: true,
        minZoom: 0,
        maxZoom: 20,
        minPitch: 0,
        maxPitch: 85,
      },
      environment,
    };
  }

  renderMap() {
    console.log(muniRoutesGeoJson);
    const onViewportChange = viewport => this.setState({ viewport });

    const { viewport, settings } = this.state;
    if (settings) {
      console.log('hi');
    }
    return (
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/eddyionescu/cj9btlvm2423a2sprnbgpk9r5"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        onViewportChange={onViewportChange}
      >
        <div className="navigation-control">
          <NavigationControl onViewportChange={onViewportChange} />
        </div>
        <DeckGL
          {...viewport}
          layers={[
            routesLayer,
          ]}
        />
      </ReactMapGL>
    );
  }

  // container that uses this data is wrapped in a QueryRenderer
  // TODO wrap map with a FragmentContainer, which declares
  // all the props it needs to load so that relay can
  // guarantee that they're available
  // (as currently it is often not loaded in time)
  // https://facebook.github.io/relay/docs/fragment-container.html
  renderMapRelay() {
    // Render this somewhere with React:
    return (
      <QueryRenderer
        environment={this.state.environment}
        query={graphql`
          query AppAllVehiclesQuery($agency: String!, $startTime: String!) {
            trynState(agency: $agency, startTime: $startTime) {
              agency
              startTime
              states {
                time
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
            }
          }
        `}
        variables={{
          agency: 'muni',
          startTime: Date.now(),
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            const { trynState } = props;
            return trynState.states[0].routes.map(route => (
              <div>{route.name} - {route.vehicles.length} vehicles</div>
            ));
          }
          return <div>Loading</div>;
        }}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        {this.renderMapRelay()}
        {this.renderMap()}
      </div>
    );
  }
}

export default App;
