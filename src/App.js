import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapGL from 'react-map-gl';
import DeckGL, {LineLayer, GeoJsonLayer } from 'deck.gl';
import { MAPBOX_ACCESS_TOKEN } from './config';
import muniRoutesGeoJson from './muniRoutes.geo';




const routesLayer = new GeoJsonLayer({
  id: 'muni-routes-geojson',
  data: muniRoutesGeoJson,
  filled: true,
  stroked: false,
  extruded: true,
});

class App extends Component {

  state = {
    // Viewport settings that is shared between mapbox and deck.gl
    viewport: {
      width: 1200,
      height: 700,
      longitude: -122.41669,
      latitude: 37.7853,
      zoom: 15,
      pitch: 0,
      bearing: 0
    },
  };

  renderMap() {
    console.log(muniRoutesGeoJson);
    const { viewport } = this.state;
    return (
      <MapGL {...viewport} 
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        onViewportChange={this._onViewportChange}
      >
        <DeckGL 
          {...viewport} 
          layers={[
            routesLayer,
          ]}
        />
      </MapGL>
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
      {this.renderMap()}
      </div>
    );
  }

  _onViewportChange = viewport => this.setState({viewport});


}

export default App;
