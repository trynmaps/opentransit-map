import React, { Component } from 'react';
import logo from './res/logo.svg';
import './styles/App.css';
import './styles/Zoom.css';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { MAPBOX_ACCESS_TOKEN } from './config';
import muniRoutesGeoJson from './res/muniRoutes.geo';
import Checkbox from './Checkbox';

class App extends Component {

  state = {
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
      minZoom: 0,
      maxZoom: 20,
      minPitch: 0,
      maxPitch: 85,
    },
    geojson: muniRoutesGeoJson
  };

  createAllGeoJsonLayerCheckboxes() {
    var result = muniRoutesGeoJson.features.map(i => this.createCheckbox(i));
    return result;
  }

  createGeoJsonLayer(bus) {
    return new GeoJsonLayer({
      id: bus.id,
      data: bus.geometry,
      filled: true,
      stroked: false,
      extruded: true,
    });
  }

  componentWillMount = () => {
    this.selectedRoutes = new Set();
  }

  filterRoutes = route => {
    if (this.selectedRoutes.has(route)) {
      this.selectedRoutes.delete(route);
    } else {
      this.selectedRoutes.add(route);
    }
    console.log("Selected routes changed");
    console.log(Array.from(this.selectedRoutes));
    var newGeojson = {
      features: Array.from(this.selectedRoutes),
      type: "FeatureCollection"
    };
    this.setState({geojson: newGeojson});
  }

  createCheckbox = route => (
    <Checkbox
            route={route}
            label={route.properties.name}
            handleCheckboxChange={this.filterRoutes}
            key={route.properties.name}
        />
  )

  renderMap() {
    const { viewport, geojson } = this.state;

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
          new GeoJsonLayer({
              id: 'muni-routes-geojson',
              data: {...geojson},
              filled: true,
              stroked: false,
              extruded: true,
            })
          ]}
        />
      </ReactMapGL>
    );
  }

  renderControlPanel() {
    return (
    <div className="control-panel">
      <div>
      {this.createAllGeoJsonLayerCheckboxes()}
      </div>
    </div>
    );
  }

  render() {
    return (
      <div>
      {this.renderMap()}
      {this.renderControlPanel()}
      </div>
    );
  }

  _onViewportChange = viewport => this.setState({viewport});

}

export default App;
