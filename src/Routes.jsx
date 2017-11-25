import React, { Component } from 'react';
import DeckGL, { GeoJsonLayer, IconLayer } from 'deck.gl';
import propTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import muniRoutesGeoJson from './res/muniRoutes.geo.json';

// Icon Layer atlas icon
const atlasIcon = require('./res/icon-atlas.png');

const routesLayer = new GeoJsonLayer({
  id: 'muni-routes-geojson',
  data: muniRoutesGeoJson,
  filled: true,
  stroked: false,
  extruded: true,
});


class Routes extends Component {
  getVehicleMarkers() {
    /* returns new DeckGL Icon Layer displaying all vehicles on given routes */
    const ICON_MAPPING = {
      marker: {
        x: 0, y: 0, width: 128, height: 128, mask: true,
      },
    };

    /* Push vehicle markers into data array */
    const data = this.props.state.routes.reduce((acc, curr) =>
      acc.concat(curr.vehicles.reduce((a, c) => {
        a.push({
          position: [c.lon, c.lat], icon: 'marker', size: 72, color: [255, 0, 0],
        });
        return a;
      }, [])), []);

    return (new IconLayer({
      id: 'icon-layer',
      data,
      iconAtlas: atlasIcon,
      iconMapping: ICON_MAPPING,
    }));
  }

  renderDeck() {
    // viewport passed by parent Map component
    const { viewport } = this.props;

    // markerLayer displays all vehicles in new Icon Layer
    const vehicleMarkerLayer = this.getVehicleMarkers();

    return (
      <DeckGL
        {...viewport}
        layers={[
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
  viewport: propTypes.shape().isRequired,
  state: propTypes.shape(
    propTypes.string,
    propTypes.arrayOf(propTypes.object),
  ).isRequired,
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
