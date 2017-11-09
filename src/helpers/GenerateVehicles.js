import React from 'react';
import muniRoutesGeoJson from '../res/muniRoutes.geo';
import { GeoJsonLayer } from 'deck.gl';

function CreateGeoJsonLayer() {
  return new GeoJsonLayer({
    id: 0,
    data: muniRoutesGeoJson.features[0].geometry,
    filled: true,
    stroked: false,
    extruded: true,
  });
}

export default () => {
  console.log("in generate vehicles.js");
  console.log(muniRoutesGeoJson);
  console.log(muniRoutesGeoJson.features);

  for (var i = 0; i < muniRoutesGeoJson.features.length; i++) {
    console.log(muniRoutesGeoJson.features[i].id);
    console.log(muniRoutesGeoJson.features[i].properties.name)
  }
};
