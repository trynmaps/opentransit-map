import { GeoJsonLayer, IconLayer } from 'deck.gl';

// Icon Layer atlas icon
const atlasIcon = require('../res/icon-atlas.png');
const busIconWest = require('../res/icon-bus-west.png');
const busIconEast = require('../res/icon-bus-east.png');

const STOP_ICON_MAPPING = {
  marker: {
    x: 0, y: 0, width: 128, height: 128, mask: true,
  },
};

const BUS_ICON_MAPPING = {
  marker: {
    x: 0, y: 0, width: 128, height: 128, mask: true,
  },
};

/* https://en.wikipedia.org/wiki/Template:MUNI_color */
const MUNI_COLOR = [
  { line: 'E', color: [102, 102, 102] },
  { line: 'F', color: [240, 230, 140] },
  { line: 'J', color: [250, 166, 52] },
  { line: 'KT', color: [86, 155, 190] },
  { line: 'L', color: [146, 39, 143] },
  { line: 'M', color: [0, 135, 82] },
  { line: 'N', color: [0, 83, 155] },
  { line: 'S', color: [255, 204, 0] },
  // { line: 'T', color: [211, 18, 69] },
  { line: 'PM', color: [83, 161, 177] },
  { line: 'PH', color: [71, 176, 153] },
  { line: 'C', color: [116, 167, 178] },
  { line: 'default', color: [204, 0, 51] },
];

/* changes color of selected stop along a route */
function selectedStopColor(stop, selectedStops) {
  const selectedStopsIds =
    selectedStops.map(currentstop => currentstop.sid);
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
    iconMapping: STOP_ICON_MAPPING,
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

export function getSubRoutesLayer(subroute) {
  const subrouteLayer = new GeoJsonLayer({
    id: 'subroute-path-layer',
    data: {
      ...subroute,
    },
    lineWidthScale: 8,
    filled: true,
    stroked: true,
    extruded: true,
    getLineColor: () => [0, 0, 255],
  });
  return subrouteLayer;
}

/* convert line name to color */
function lineToColor(line) {
  const checkedLine = MUNI_COLOR.filter(e => e.line === line);
  if (checkedLine.length > 0) {
    return checkedLine[0].color;
  }
  return MUNI_COLOR[MUNI_COLOR.length - 1].color;
}

export function getVehicleMarkersLayer(route, displayVehicleInfo) {
  /* return a new IconLayer */
  function newIconLayer(id, data, iconAtlas) {
    return new IconLayer({
      id,
      data,
      iconAtlas,
      iconMapping: BUS_ICON_MAPPING,
      pickable: true,
      // calls pop-up function
      onClick: info => displayVehicleInfo(info),
    });
  }

  /* returns new DeckGL Icon Layer displaying all vehicles on given routes */
  const westData = route.routeStates[0].vehicles.reduce((westBus, vehicle) => {
    if (vehicle.heading >= 180) {
      westBus.push({
        position: [vehicle.lon, vehicle.lat],
        icon: 'marker',
        size: 128,
        angle: 270 - vehicle.heading,
        color: lineToColor(route.rid),
        // added vid & heading info to display onClick pop-up
        vid: vehicle.vid,
        heading: vehicle.heading,
      });
    }
    return westBus;
  }, []);

  const eastData = route.routeStates[0].vehicles.reduce((eastBus, vehicle) => {
    if (vehicle.heading < 180) {
      eastBus.push({
        position: [vehicle.lon, vehicle.lat],
        icon: 'marker',
        size: 128,
        angle: 90 - vehicle.heading,
        color: lineToColor(route.rid),
        // added vid & heading info to display onClick pop-up
        vid: vehicle.vid,
        heading: vehicle.heading,
      });
    }
    return eastBus;
  }, []);

  return [
    newIconLayer('west-vehicle-icon-layer', westData, busIconWest),
    newIconLayer('east-vehicle-icon-layer', eastData, busIconEast),
  ];
}
