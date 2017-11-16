import React, { Component } from 'react';
import logo from './res/logo.svg';
import './styles/App.css';
import './styles/Zoom.css';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { MAPBOX_ACCESS_TOKEN } from './config';
import muniRoutesGeoJson from './res/muniRoutes.geo';
import Sidebar from './components/sidebar';

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
      width: (2 * window.innerWidth) / 3,
      height: window.innerHeight,
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
        mapStyle="mapbox://styles/eddyionescu/cj9btlvm2423a2sprnbgpk9r5"
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
    return (
      <div>
        <div className="map">
          {this.renderMap()}
        </div>
        <div className="sidebar pad2">
          <Sidebar></Sidebar>
        </div>
      </div>
      
    );
  }

  _onViewportChange = viewport => this.setState({viewport});

}

export default App;
