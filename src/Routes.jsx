import React, { Component } from 'react';
import DeckGL, { GeoJsonLayer, IconLayer } from 'deck.gl';
import propTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import muniRoutesGeoJson from './res/muniRoutes.geo.json';

const atlasIcon = require('./res/icon-atlas.png');

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

    /* Push vehicle markers into data array */
    const vehicleData = this.props.state.routes.reduce((acc, curr) =>
      acc.concat(curr.vehicles.reduce((a, c) => {
        a.push({
          position: [c.lon, c.lat], icon: 'marker', size: 72, color: [255, 0, 0],
        });
        return a;
      }, [])), []);

    // Push stop markers into data array
    // because route.stops return null now, control stops before map function
    const stopData = this.props.state.routes.filter(r => r.stops).reduce((acc, curr) =>
      acc.concat(curr.stops.reduce((a, c) => {
        a.push({
          position: [c.lon, c.lat], icon: 'marker', size: 72, color: [255, 0, 0],
        });
        return a;
      }, [])), []);

    // combine vehicle and stop data
    const data = vehicleData.concat(stopData);

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
