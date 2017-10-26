import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Zoom.css';
import {render} from 'react-dom';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { MAPBOX_ACCESS_TOKEN } from './config';
import muniRoutesGeoJson from './muniRoutes.geo';
import getVehicles from './GetVehicles';

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
      bearing: 0,
    },
    settings: {
      dragPan: true,
      //dragRotate: true,
      //scrollZoom: true,
      //touchZoomRotate: true,
      //doubleClickZoom: true,
      minZoom: 0,
      maxZoom: 20,
      minPitch: 0,
      maxPitch: 85,
    },
  };

  renderMap() {
    console.log(muniRoutesGeoJson);
    const { viewport, settings } = this.state;
    return (
      <ReactMapGL {...viewport} 
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        onViewportChange={this._onViewportChange} 
      >
        <div className="navigation-control">
          <NavigationControl onViewportChange={this._onViewportChange} />
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

  render() {
    getVehicles();
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
