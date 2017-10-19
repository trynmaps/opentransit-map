import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapGL from 'react-map-gl';
import DeckGL, {LineLayer, GeoJsonLayer } from 'deck.gl';
import { MAPBOX_ACCESS_TOKEN } from './config';
import muniRoutesGeoJson from './muniRoutes2';
import bart from './bart.geo';


// Viewport settings that is shared between mapbox and deck.gl
const viewport = {
  width: 1000,
  height: 700,
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 10,
  pitch: 0,
  bearing: 0
}

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [-123.41669, 37.7853],
    targetPosition: [-121.41669, 37.781],
    color: [255, 0, 0],
  }
];

const routesLayer = new GeoJsonLayer({
  id: 'geojson',
  data: bart,
  filled: true,
  stroked: false,
  extruded: true,
  opacity: 0.8,
  lineWidthScare: 3,
});

class App extends Component {
  /**
   * Data format:
   * Valid GeoJSON object
   */


  renderMap() {
    console.log(muniRoutesGeoJson);
    return (
      <MapGL {...viewport} 
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        <DeckGL 
          {...viewport} 
          layers={[
            new LineLayer({id: 'line-layer', data, strokeWidth: 3}),
            routesLayer,
          ]}
          strokeWidth={30}
          stroked
          lineWidth={20}
        />
      </MapGL>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.renderMap()}
      </div>
    );
  }
}

export default App;
