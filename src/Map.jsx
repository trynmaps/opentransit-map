import React, { Component } from 'react';
import ReactMapGL, { NavigationControl, Popup } from 'react-map-gl';
import DeckGL from 'deck.gl';
import {
  graphql,
  createRefetchContainer,
} from 'react-relay';
import propTypes from 'prop-types';
import * as turf from '@turf/turf';
import { MAP_STYLE, MAPBOX_ACCESS_TOKEN } from './config.json';
import {
  getStopMarkersLayer,
  getRoutesLayer,
  getVehicleMarkersLayer,
  getSubRoutesLayer,
} from './Route';
import ControlPanel from './ControlPanel';
import cities from './Cities.json';

/*
* Stop class used to handle info about selected stops
*/
class Stop {
  constructor(stop) {
    this.stop = stop;
  }
  isUndefined() {
    return typeof this.stop === 'undefined';
  }
  setCoordinates(coordinates) {
    this.stop = {
      lon: coordinates[0],
      lat: coordinates[1],
    };
  }
  getCoordinateArray() {
    return [this.stop.lon, this.stop.lat];
  }
  /**
  * sees if two stops are equal by evaluating their coordinates
  */
  equals(stop) {
    return this.stop.lon === stop.lon && this.stop.lat === stop.lat;
  }
}

class Map extends Component {
  constructor() {
    super();
    this.filterRoutes = this.filterRoutes.bind(this);
    this.toggleStops = this.toggleStops.bind(this);
    this.setNewCity = this.setNewCity.bind(this);
    this.refetch = this.refetch.bind(this);
    this.state = {
      // Viewport settings that is shared between mapbox and deck.gl
      viewport: {
        width: (2 * window.innerWidth) / 3,
        height: window.innerHeight,
        longitude: -122.41669,
        latitude: 37.7853,
        zoom: 13,
        pitch: 0,
        bearing: 0,
      },
      popup: {
        coordinates: { lon: 0, lat: 0 },
        info: { vid: '', heading: 0 },
      },
      showStops: true,
      selectedStops: [],
      subroute: null,
    };
  }

  componentWillMount() {
    this.selectedRoutes = new Set();
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  /**
   * given the two selected stop sids, returns a line segment
   * between them
   */
  getRouteBetweenStops(routeStops, stops) {
    const stopSids = stops.map(stop => stop.sid);
    stopSids.sort((a, b) => a - b);
    const route = routeStops.map(stop => [stop.lon, stop.lat]);
    const startingPointStop = new Stop(routeStops.find(stop => stop.sid === stopSids[0]));
    const endingPointStop = new Stop(routeStops.find(stop => stop.sid === stopSids[1]));
    /*
    * if either value is undefined, it means user selected another stop on another route.
    * so clear all stops and subroute
    */
    if (startingPointStop.isUndefined() || endingPointStop.isUndefined()) {
      this.setState({ subroute: null, selectedStops: [] });
      return;
    }
    const startingPoint = turf.point(startingPointStop.getCoordinateArray());
    const endingPoint = turf.point(endingPointStop.getCoordinateArray());
    const line = turf.lineString(route);
    const subroute = turf.lineSlice(startingPoint, endingPoint, line);
    this.setState({ subroute, selectedStops: stops });
  }
  /**
   * sets stop sids based on selected stops.
   * Stores up to two stops sids. Used to draw subroutes
   */
  getStopInfo(route, stopCoordinates) {
    let stops = [...this.state.selectedStops];
    const station = route.stops.find(currentStop => currentStop.lon === stopCoordinates[0]
    && currentStop.lat === stopCoordinates[1]);
    const stopInfo = new Stop();
    stopInfo.setCoordinates(stopCoordinates);
    stopInfo.sid = station.sid;
    if (stops.length > 1) {
      stops = [];
    }
    if (stops.length === 0
      || (stops.length === 1 && !stops[0].equals(stopInfo))) {
      stops.push(stopInfo);
    }
    if (stops.length === 2) {
      this.getRouteBetweenStops(route.stops, stops);
    } else {
      this.setState({ selectedStops: stops, subroute: null });
    }
  }
  /**
   * Calculate & Update state of new dimensions
   */

  setNewCity(clicked) {
    let newCity = {};
    cities.forEach((city) => { if (city.name === clicked.value) newCity = city; });

    this.setState({
      viewport: Object.assign(this.state.viewport, {
        latitude: newCity.latitude,
        longitude: newCity.longitude,
      }),
    });
  }

  updateDimensions() {
    this.setState({
      viewport: Object.assign(this.state.viewport, {
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    });
  }

  displayVehicleInfo(info) {
    /* calls parent' onMarkerClick function to show pop-up to display vehicle id & heading info */
    if (info && info.object && info.object.vid && info.object.heading) {
      this.setState({
        popup: {
          coordinates: {
            lon: info.lngLat[0],
            lat: info.lngLat[1],
          },
          info: info.object,
        },
      });
    }
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
    this.setState({ geojson: newGeojson });
  }

  toggleStops() {
    this.setState({ showStops: !this.state.showStops });
  }

  refetch(data) {
    this.props.relay.refetch(
      data,
      null,
      (err) => {
        if (err) {
          console.warn(err);
        }
      },
      { force: true },
    );
  }

  renderMap() {
    const onViewportChange = viewport => this.setState({ viewport });
    const { trynState } = this.props.trynState || {};
    const { routes } = trynState || {};
    const {
      viewport, geojson, subroute, selectedStops,
    } = this.state;
    const subRouteLayer = subroute && getSubRoutesLayer(subroute);
    // selectedRouteNames comes from GeoJSON file
    const selectedRouteNames = new Set();
    this.selectedRoutes
      .forEach(route => selectedRouteNames.add(route.properties.name));
    // maps API route name to GeoJSON route name
    const routeNameMapping = {
      KT: 'K/T',
    };
    // eslint-disable-next-line no-console
    const routeLayers = (routes || [])
      .filter(route => selectedRouteNames.has(routeNameMapping[route.rid] || route.rid))
      .reduce((layers, route) => [
        ...layers,
        this.state.showStops
          ? getStopMarkersLayer(
            route,
            marker => this.getStopInfo(route, marker.object.position), selectedStops,
          )
          : null,
        subRouteLayer,
        ...getVehicleMarkersLayer(route, info => this.displayVehicleInfo(info)),
      ], []);
    // eslint-disable-next-line no-console
    routeLayers.push(getRoutesLayer(geojson));
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
        {this.state.popup.coordinates ? (
          <Popup
            longitude={this.state.popup.coordinates.lon}
            latitude={this.state.popup.coordinates.lat}
            onClose={() => this.setState({ popup: {} })}
          >
            <div>
              <p>ID: {this.state.popup.info.vid}</p>
              <p>Heading: {this.state.popup.info.heading}</p>
            </div>
          </Popup>) : null}

        <DeckGL
          {...viewport}
          layers={routeLayers}
        />
      </ReactMapGL>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="map col-sm-9 offset-sm-3 col-md-10 offset-md-2">
            {this.renderMap()}
          </div>
          <div className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
            <ControlPanel
              filterRoutes={this.filterRoutes}
              toggleStops={this.toggleStops}
              setNewCity={this.setNewCity}
              refetch={this.refetch}
            />
          </div>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  trynState: propTypes.shape(
    propTypes.string,
    propTypes.arrayOf(propTypes.object),
  ).isRequired,
  relay: propTypes.element.isRequired,
};

export default createRefetchContainer(
  Map,
  graphql`
  fragment Map_trynState on Query {
    trynState(agency: $agency, startTime: $startTime, endTime: $endTime){
      startTime
      endTime
      agency
      routes {
        rid
        stops {
          sid
          lat
          lon
          name
        }
        routeStates {
          vtime
          vehicles {
            vid
            lat
            lon
            heading
          }
        }
      }
    }
  }
  `,
  graphql`
  query Map_UpdateStateQuery($agency: String!, $startTime: String!, $endTime: String!) {
    ...Map_trynState
  }
  `,
);
