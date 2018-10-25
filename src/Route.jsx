import { GeoJsonLayer, IconLayer } from 'deck.gl';

// Icon Layer atlas icon
const atlasIcon = require('./res/icon-atlas.png');
const busIconWest = require('./res/icon-bus-west.png');
const busIconEast = require('./res/icon-bus-east.png');

const STOP_ICON_MAPPING = {
  marker: {
    x: 0, y: 0, width: 128, height: 128, mask: true,
  },
};

const BUS_ICON_MAPPING = {
  marker: {
    x: 0, y: 0, width: 128, height: 128, mask: false,
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

export function getVehicleMarkersLayer(route, displayVehicleInfo) {
  /* returns new DeckGL Icon Layer displaying all vehicles on given routes */
  const westData = route.routeStates[0].vehicles.reduce((westBus, vehicle) => {
    if (vehicle.heading >= 180) {
      westBus.push({
        position: [vehicle.lon, vehicle.lat],
        icon: 'marker',
        size: 128,
        angle: 270 - vehicle.heading,
        color: [0, 0, 255],
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
        color: [0, 0, 255],
        // added vid & heading info to display onClick pop-up
        vid: vehicle.vid,
        heading: vehicle.heading,
      });
    }
    return eastBus;
  }, []);

  return [
    new IconLayer({
      id: 'west-vehicle-icon-layer',
      data: westData,
      iconAtlas: busIconWest,
      iconMapping: BUS_ICON_MAPPING,
      pickable: true,
      // calls pop-up function
      onClick: info => displayVehicleInfo(info),
    }),
    new IconLayer({
      id: 'east-vehicle-icon-layer',
      data: eastData,
      iconAtlas: busIconEast,
      iconMapping: BUS_ICON_MAPPING,
      pickable: true,
      // calls pop-up function
      onClick: info => displayVehicleInfo(info),
    }),
  ];
}
