import React, { Component } from 'react';
import DeckGL, { GeoJsonLayer, IconLayer } from 'deck.gl';
import propTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import muniRoutesGeoJson from './res/muniRoutes.geo.json';

const routesLayer = new GeoJsonLayer({
  id: 'muni-routes-geojson',
  data: muniRoutesGeoJson,
  filled: true,
  stroked: false,
  extruded: true,
});

class Routes extends Component {
  getMarkers() {
    /* returns new DeckGL Icon Layer displaying all vehicles and stops on given routes */
    const ICON_MAPPING = {
      marker: {
        x: 0, y: 0, width: 128, height: 128, mask: true,
      },
    };
    const data = [];

    // Push stop markers into data array
    // because route.stops return null now, control stops before map function
    this.props.state.routes.map(route => route.stops && route.stops.map(stop =>
      data.push({
        position: [stop.lon, stop.lat], icon: 'marker', size: 72, color: [0, 255, 0],
      })));

    /* Push vehicle markers into data array */
    this.props.state.routes.map(route => route.vehicles.map(vehicle =>
      data.push({
        position: [vehicle.lon, vehicle.lat], icon: 'marker', size: 72, color: [255, 0, 0],
      })));

    return (new IconLayer({
      id: 'icon-layer',
      data,
      iconAtlas: 'https://uber.github.io/deck.gl/images/icon-atlas.png',
      iconMapping: ICON_MAPPING,
    }));
  }

  renderDeck() {
    // viewport passed by parent Map component
    const { viewport } = this.props;

    // markerLayer displays all vehicles and stops in new Icon Layer
    const markerLayer = this.getMarkers();

    return (
      <DeckGL
        {...viewport}
        layers={[
          markerLayer,
          routesLayer,
        ]}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderDeck()}
      </div>
    );
  }
}

Routes.propTypes = {
  viewport: propTypes.shape().isRequired,
  state: propTypes.shape(
    propTypes.string,
    propTypes.arrayOf(propTypes.object),
  ).isRequired,
};

export default createFragmentContainer(Routes, graphql`
  fragment Routes_state on State {
    routes {
      name
      stops {
        sid
        lat
        lon
        name
      }
      vehicles {
        vid
        lat
        lon
        heading
      }
    }
  }
`);
