import { GeoJsonLayer, IconLayer } from 'deck.gl';

// Icon Layer atlas icon
const atlasIcon = require('./res/icon-atlas.png');
const busIconWest = require('./res/icon-bus-west.png');
const busIconEast = require('./res/icon-bus-east.png');

const ICON_MAPPING = {
  marker: {
    x: 0, y: 0, width: 128, height: 128, mask: true,
  },
};

/* changes color of selected stop along a route */
function selectedStopColor(stop, selectedStops) {
  const selectedStopsIds
  = selectedStops.map(currentstop => currentstop.sid);
  if (selectedStopsIds.includes(stop.sid)) {
    return [0, 255, 0];
  }
  return [255, 0, 0];
}
export function getStopMarkersLayer(route, getStopInfo, selectedStops) {
  /* returns new DeckGL Icon Layer displaying all stops on given routes */

  // Push stop markers into data array
  const data = route.stops.map(stop => ({
    position: [stop.lon, stop.lat],
    icon: 'marker',
    size: 72,
    color: selectedStopColor(stop, selectedStops),
  }));

  return (new IconLayer({
    id: 'stop-icon-layer',
    data,
    iconAtlas: atlasIcon,
    iconMapping: ICON_MAPPING,
    pickable: true,
    onClick: info => getStopInfo(info),
  }));
}

export function getRoutesLayer(geojson) {
  return (new GeoJsonLayer({
    id: 'muni-routes-geojson',
    data: {
      ...geojson,
    },
    lineWidthScale: 8,
    filled: true,
    stroked: true,
    extruded: true,
  }));
}

/* return east/west vehicle data in layer data format */
function formatVehicleData(allVehicles, filterFunc) {
  return allVehicles.filter(filterFunc).reduce((vehicles, vehicle) => [...vehicles, {
    position: [vehicle.lon, vehicle.lat],
    icon: 'marker',
    size: 128,
    angle: 270 - vehicle.heading,
    color: [0, 0, 255],
    // added vid & heading info to display onClick pop-up
    vid: vehicle.vid,
    heading: vehicle.heading,
  }], []);
}

/* return icon layer for west/east busses */
function formatIconLayer({ id, data, iconAtlas }) {
  return new IconLayer({
    id,
    data,
    iconAtlas,
    iconMapping: ICON_MAPPING,
    pickable: true,
    // calls pop-up function
    onClick: info => displayVehicleInfo(info),
  });
}

export function getVehicleMarkersLayer(route, displayVehicleInfo) {
  /* returns new DeckGL Icon Layer displaying all vehicles on given routes */
  const allVehicles = route.routeStates[0].vehicles;
  const westFilterFunc = vehicle => vehicle.heading >= 180;
  const eastFilterFunc = vehicle => vehicle.heading < 180;
  const westData = formatVehicleData(allVehicles, westFilterFunc);
  const eastData = formatVehicleData(allVehicles, eastFilterFunc);
  const westIconLayerOptions = {
    id: 'west-vehicle-icon-layer',
    data: westData,
    iconAtlas: busIconWest,
  };
  const eastIconLayerOptions = {
    id: 'east-vehicle-icon-layer',
    data: eastData,
    iconAtlas: busIconEast,
  };
  return [
    formatIconLayer(westIconLayerOptions),
    formatIconLayer(eastIconLayerOptions),
  ];
}
