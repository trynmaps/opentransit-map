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

export function getStopMarkersLayer(route) {
  /* returns new DeckGL Icon Layer displaying all stops on given routes */

  // Push stop markers into data array
  const data = route.stops.map(stop => ({
    position: [stop.lon, stop.lat],
    icon: 'marker',
    size: 72,
    color: [255, 0, 0],
  }));

  return (new IconLayer({
    id: 'stop-icon-layer',
    data,
    iconAtlas: atlasIcon,
    iconMapping: ICON_MAPPING,
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

  return {
    westBus: new IconLayer({
      id: 'west-vehicle-icon-layer',
      data: westData,
      iconAtlas: busIconWest,
      iconMapping: ICON_MAPPING,
      pickable: true,
      // calls pop-up function
      onClick: info => displayVehicleInfo(info),
    }),
    eastBus: new IconLayer({
      id: 'east-vehicle-icon-layer',
      data: eastData,
      iconAtlas: busIconEast,
      iconMapping: ICON_MAPPING,
      pickable: true,
      // calls pop-up function
      onClick: info => displayVehicleInfo(info),
    }),
  };
}
