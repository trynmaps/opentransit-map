import React, { Component } from 'react';
import DeckGL, { GeoJsonLayer, IconLayer } from 'deck.gl';
import propTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

// Icon Layer atlas icon
const atlasIcon = require('./res/icon-atlas.png');

// placed outside of component to use in both stop & vehicle layer
const ICON_MAPPING = {
  marker: {
    x: 0, y: 0, width: 128, height: 128, mask: true,
  },
};

class Routes extends Component {
  getStopMarkers() {
    /* returns new DeckGL Icon Layer displaying all stops on given routes */

    // Push stop markers into data array
    const data = this.props.state.routes.filter(r => r.stops).reduce((acc, curr) =>
      [...acc, ...curr.stops.reduce((a, c) => [...a, {
        position: [c.lon, c.lat],
        icon: 'marker',
        size: 72,
        color: [255, 0, 0],
      }], {})], []);
    return (new IconLayer({
      id: 'stop-icon-layer',
      data,
      iconAtlas: atlasIcon,
      iconMapping: ICON_MAPPING,
    }));
  }

  getRoutesLayer() {
    return (new GeoJsonLayer({
      id: 'muni-routes-geojson',
      data: {
        ...this.props.geojson,
      },
      lineWidthScale: 8,
      filled: true,
      stroked: true,
      extruded: true,
    }));
  }

  getVehicleMarkers() {
    /* returns new DeckGL Icon Layer displaying all vehicles on given routes */

    /* Push vehicle markers into data array */
    const data = this.props.state.routes.filter(r => r.vehicles).reduce((acc, curr) =>
      [...acc, ...curr.vehicles.filter(v => v.vid).reduce((a, c) => [...a, {
        position: [c.lon, c.lat],
        icon: 'marker',
        size: 72,
        color: [0, 0, 255],
        // added vid & heading info to display onClick pop-up
        vid: c.vid,
        heading: c.heading,
      }], {})], []);

    return (new IconLayer({
      id: 'vehicle-icon-layer',
      data,
      iconAtlas: atlasIcon,
      iconMapping: ICON_MAPPING,
      pickable: true,
      // calls pop-up function
      onClick: info => this.displayVehicleInfo(info),
    }));
  }

  displayVehicleInfo(info) {
    /* calls parent' onMarkerClick function to show pop-up to display vehicle id & heading info */
    if (info && info.object && info.object.vid) {
      this.props.onMarkerClick(
        info.lngLat[0],
        info.lngLat[1],
        // passes vid & heading info to parent Map component
        { vid: info.object.vid, heading: info.object.heading },
      );
    }
  }

  renderDeck() {
    // viewport passed by parent Map component
    const { viewport, geojson } = this.props;

    // markerLayer displays all stops in new Icon Layer
    const stopMarkerLayer = this.getStopMarkers();

    // markerLayer displays all vehicles in new Icon Layer
    const vehicleMarkerLayer = this.getVehicleMarkers();

    const routesLayer = this.getRoutesLayer({ ...geojson });

    return (
      <DeckGL
        {...viewport}
        layers={[
          stopMarkerLayer,
          vehicleMarkerLayer,
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
  onMarkerClick: propTypes.func.isRequired,
  viewport: propTypes.shape().isRequired,
  state: propTypes.shape(
    propTypes.string,
    propTypes.arrayOf(propTypes.object),
  ).isRequired,
  geojson: propTypes.string.isRequired,
};

export default createFragmentContainer(
  Routes,
  graphql`
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
  `,
);
