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
import muniRoutesGeoJson from './res/muniRoutes.geo.json';
import Checkbox from './Checkbox';
import { Stop, sortAlphaNumeric } from './Util';

const liveDataInterval = 15000;

// make a copy of routes and sort
const sortedRoutes = muniRoutesGeoJson.features.slice(0).sort(sortAlphaNumeric);
import ControlPanel from './ControlPanel';

class Map extends Component {
  constructor() {
    super();
    this.filterRoutes = this.filterRoutes.bind(this);
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
      liveMap: false,
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
  
  setNewStateTime(newStateTime) {
    this.setState({ currentStateTime: newStateTime });
    this.props.relay.refetch(
      {
        startTime: Number(newStateTime) - 15000,
        endTime: Number(newStateTime),
        agency: 'muni',

      },
      null,
      (err) => {
        if (err) {
          console.warn(err);
        }
      },
      { force: true },
    );
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
      console.log(`Stop Sid: ${stopInfo.sid}`);
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
  fetchLiveData() {
    setTimeout(() => {
      this.setNewStateTime(new Date());
    }, liveDataInterval);
  }

  renderControlPanel() {
    return (
      <div className="control-panel">
        <div className="routes-header">
          <h3>Time</h3>
          <DateTimePicker
            value={this.state.currentStateTime}
            onChange={newTime => this.setNewStateTime(newTime)}
          />
        </div>
        <div className=" routes-header liveMapContainer">
          <h3>Live Mode</h3>
          <Toggle
            defaultChecked={this.state.liveMap}
            onChange={() => this.setState({ liveMap: !this.state.liveMap })}
          />
        </div>
        <div className="routes-header stops-toggle">
          <h3>Stops</h3>
          <Toggle
            defaultChecked={this.state.showStops}
            onChange={() => this.setState({ showStops: !this.state.showStops })}
          />
        </div>
        <div className="routes-header">
          <h3>Routes</h3>
        </div>
        <ul className="route-checkboxes">
          {sortedRoutes.map(route => (
            <Checkbox
              route={route}
              label={route.properties.name}
              handleCheckboxChange={checkedRoute => this.filterRoutes(checkedRoute)}
              key={route.id}
            />
          ))}
        </ul>
      </div>
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
    const selectedRouteNames = new Set();
    this.selectedRoutes
      .forEach(route => selectedRouteNames.add(route.properties.name));
    const routeLayers = (routes || [])
      .filter(route => selectedRouteNames.has(route.rid))
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
    const { liveMap } = this.state;
    if (liveMap) {
      this.fetchLiveData();
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="map col-sm-9 offset-sm-3 col-md-10 offset-md-2">
            {this.renderMap()}
          </div>
          <div className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
            <ControlPanel filter={this.filterRoutes} />
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
