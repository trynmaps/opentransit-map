import React, { Component } from 'react';
import ReactMapGL, { NavigationControl, Popup } from 'react-map-gl';
import {
  graphql,
  createFragmentContainer,
} from 'react-relay';
import propTypes from 'prop-types';
import { MAP_STYLE, MAPBOX_ACCESS_TOKEN } from './config';
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
      coordinates: [0, 0],
      info: '',
    };

    // bind this to onMarker method for child component' access to this.state
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(x, y, info) {
    this.setState({ coordinates: [x, y], info });
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
          longitude={this.state.coordinates[0]}
          latitude={this.state.coordinates[1]}
        >
          <div>
            <p>ID: {this.state.info.vid}</p>
            <p>Heading: {this.state.info.heading}</p>
          </div>
        </Popup>

        {/* Routes component returns DeckGL component with routes and markers layer */}
        <Routes onMarkerClick={this.onMarkerClick} state={this.props.state} viewport={viewport} />
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

