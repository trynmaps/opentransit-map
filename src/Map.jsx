import React, { Component } from 'react';
import ReactMapGL, { NavigationControl, Popup } from 'react-map-gl';
import DeckGL from 'deck.gl';
import {
  graphql,
  createRefetchContainer,
} from 'react-relay';
import propTypes from 'prop-types';
import { DateTimePicker } from 'react-widgets';
import Toggle from 'react-toggle';
import { MAP_STYLE, MAPBOX_ACCESS_TOKEN } from './config.json';
import {
  getStopMarkersLayer,
  getRoutesLayer,
  getVehicleMarkersLayer,
} from './Route';
import muniRoutesGeoJson from './res/muniRoutes.geo.json';
import Checkbox from './Checkbox';

class Map extends Component {
  constructor() {
    super();
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
      settings: {
        dragPan: true,
        minZoom: 0,
        maxZoom: 20,
        minPitch: 0,
        maxPitch: 85,
      },
      popup: {
        coordinates: { lon: 0, lat: 0 },
        info: { vid: '', heading: 0 },
      },
      selectedStops: [],
      currentStateTime: new Date(Date.now()),
      showStops: true,
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
          console.log(err);
        }
      },
      { force: true },
    );
  }
  getRouteBetweenStops(route) {
    const stopSids = this.state.selectedStops.map(stop => stop.sid);
    const routeStops = route.stops;
    const indexArray = [];
    for (let i = 0; i < routeStops.length; i += 1) {
      if (stopSids.includes(routeStops[i].sid)) {
        indexArray.push(i);
        if (indexArray.length === 2) {
          break;
        }
      }
    }
    indexArray.sort((a, b) => a - b);
    return route.stops.filter((stop, index) => index >= indexArray[0] && index <= indexArray[1]);
  }
  getStopInfo(route, stopCoordinates) {
    let stops = this.state.selectedStops;
    const station
    = route.stops.find(currentStop => currentStop.lon === stopCoordinates[0]
    && currentStop.lat === stopCoordinates[1]);
    const stopInfo = Object.assign({}, stopCoordinates);
    stopInfo.sid = station.sid;
    if (stops.length > 1) {
      stops = [];
    }
    if (stops.length === 0
      || (stops.length === 1 && !this.checkIfTwoStopsAreEqual(stops[0], stopCoordinates))) {
      console.log(`Stop Sid: ${stopInfo.sid}`);
      stops.push(stopInfo);
    }
    this.setState({ selectedStops: stops });
    if (stops.length === 2) {
      const routeSegment = this.getRouteBetweenStops(route);
      console.log(routeSegment);
    }
  }
  /**
   * sees if two stops are equal by evaluating their coordinates
   */
  checkIfTwoStopsAreEqual(stop1, stop2) {
    console.log(this);
    return stop1[0] === stop2[0] && stop1[1] === stop2[1];
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
          {muniRoutesGeoJson.features.map(route => (
            <Checkbox
              route={route}
              label={route.properties.name}
              handleCheckboxChange={checkedRoute => this.filterRoutes(checkedRoute)}
              key={route.properties.name}
            />
          ))}
        </ul>
      </div>
    );
  }

  renderMap() {
    const onViewportChange = viewport => this.setState({ viewport });
    const { trynState } = this.props.trynState;
    const { routes } = trynState || {};
    const { viewport, settings, geojson } = this.state;

    // I don't know what settings used for,
    // just keeping it in following format to bypass linter errors
    console.log(settings && settings);

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
            marker => this.getStopInfo(route, marker.object.position), this.state.selectedStops,
          )
          : null,
        getRoutesLayer(geojson),
        ...getVehicleMarkersLayer(route, info => this.displayVehicleInfo(info)),
      ], []);

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
            {this.renderControlPanel()}
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
