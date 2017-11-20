import React, { Component } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import './styles/App.css';
import './styles/Zoom.css';
import { MAPBOX_ACCESS_TOKEN } from './config.json';
import muniRoutesGeoJson from './res/muniRoutes.geo.json';
import Checkbox from './Checkbox';

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
      geojson: muniRoutesGeoJson,
    };
  }

  componentWillMount() {
    this.selectedRoutes = new Set();
  }

  createAllGeoJsonLayerCheckboxes() {
    const result = muniRoutesGeoJson.features.map(i => this.createCheckbox(i));
    return result;
  }

  filterRoutes(route) {
    if (this.selectedRoutes.has(route)) {
      this.selectedRoutes.delete(route);
    } else {
      this.selectedRoutes.add(route);
    }
    const newGeojson = {
      features: Array.from(this.selectedRoutes),
      type: 'FeatureCollection',
    };
    this.setState({
      geojson: newGeojson,
    });
  }

  createCheckbox(route) {
    return (
      <Checkbox
        route={route}
        label={route.properties.name}
        handleCheckboxChange={checkedRoute => this.filterRoutes(checkedRoute)}
        key={route.properties.name}
      />
    );
  }

  renderMap() {
    const onViewportChange = viewport => this.setState({ viewport });

    const { viewport, geojson } = this.state;
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
            new GeoJsonLayer({
                id: 'muni-routes-geojson',
                data: {
                  ...geojson,
                },
                filled: true,
                stroked: false,
                extruded: true,
              }),
          ]}
        />
      </ReactMapGL>
    );
  }

  renderControlPanel() {
    return (
      <div className="control-panel">
        {this.createAllGeoJsonLayerCheckboxes()}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="map">
          {this.renderMap()}
        </div>
        <div className="control-panel-container">
          {this.renderControlPanel()}
        </div>
      </div>
    );
  }
}

export default App;
