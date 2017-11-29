import React, { Component } from 'react';
import ReactMapGL, { NavigationControl, Popup } from 'react-map-gl';
import {
  graphql,
  createFragmentContainer,
} from 'react-relay';
import propTypes from 'prop-types';
import { MAP_STYLE, MAPBOX_ACCESS_TOKEN } from './config.json';
import Routes from './Routes';


class Map extends Component {
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
      popup: {
        coordinates: { lon: 0, lat: 0 },
        info: { vid: '', heading: 0 },
      },
    };
  }

  onMarkerClick(lon, lat, info) {
    this.setState({ popup: { coordinates: { lon, lat }, info } });
  }

  renderMap() {
    const onViewportChange = viewport => this.setState({ viewport });

    const { viewport, settings } = this.state;
    // I don't know what settings used for,
    // just keeping it in following format to bypass linter errors
    console.log(settings && settings);
    return (
      <ReactMapGL
        {...viewport}
        mapStyle={MAP_STYLE}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        onViewportChange={onViewportChange}
      >
        <div className="navigation-control">
          <NavigationControl onViewportChange={onViewportChange} />
        </div>

        {/* React Map GL Popup component displays vehicle ID & heading info */}

        <Popup
          longitude={this.state.popup.coordinates.lon}
          latitude={this.state.popup.coordinates.lat}
        >
          <div>
            <p>ID: {this.state.popup.info.vid}</p>
            <p>Heading: {this.state.popup.info.heading}</p>
          </div>
        </Popup>

        {/* Routes component returns DeckGL component with routes and markers layer */}
        <Routes
          onMarkerClick={(lon, lat, info) => this.onMarkerClick(lon, lat, info)}
          state={this.props.state}
          viewport={viewport}
        />
      </ReactMapGL>
    );
  }

  render() {
    return (
      <div>
        {this.renderMap()}
      </div>
    );
  }
}

Map.propTypes = {
  state: propTypes.shape(
    propTypes.string,
    propTypes.arrayOf(propTypes.object),
  ).isRequired,
};

export default createFragmentContainer(
  Map,
  graphql`
    fragment Map_state on State {
      ...Routes_state
    }
  `,
);

