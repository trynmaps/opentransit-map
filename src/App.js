import React, { Component } from 'react';
import logo from './res/logo.svg';
import './styles/App.css';
import './styles/Zoom.css';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { MAPBOX_ACCESS_TOKEN } from './config';
import muniRoutesGeoJson from './res/muniRoutes.geo';
import getVehicles from './helpers/GetVehicles';
import Checkbox from './Checkbox';

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
    geojson: muniRoutesGeoJson
  };

  createAllGeoJsonLayerCheckboxes() {
    var result = muniRoutesGeoJson.features.map(i => this.createCheckbox(i.properties.name, i.properties.onestop_id));
    return result;
    //return allRoutes.push(muniRoutesGeoJson);
  }

  getAllVehicleRoutes() {
    var result = muniRoutesGeoJson.features;
    console.log(result);
    return "";
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
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
    console.log(this.selectedCheckboxes);
  }

  createCheckbox = (label, id) => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            stopId={id}
            key={label}
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
    console.log("Rendering control panel");
    return (
    <div className="control-panel">
      <div>
      {this.createAllGeoJsonLayerCheckboxes()}
      </div>
    </div>
    );
  }

  render() {
    getVehicles();
    return (
      <div>
      {this.renderMap()}
      {this.renderControlPanel()}
      {this.getAllVehicleRoutes()}
      </div>
    );
  }

  _onViewportChange = viewport => this.setState({viewport});


}

export default App;
