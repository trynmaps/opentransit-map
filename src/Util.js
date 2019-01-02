/*
* Stop class used to handle info about selected stops
*/
export class Stop {
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

export function sortAlphaNumeric(a, b) {
  const notAlpha = /[^a-zA-Z]/g;
  const aRoute = a.properties.name;
  const bRoute = b.properties.name;
  const aInteger = parseInt(aRoute, 10);
  const bInteger = parseInt(bRoute, 10);
  const aAlpha = aRoute.replace(notAlpha, '');
  const bAlpha = bRoute.replace(notAlpha, '');

  // special case for K/T and K-OWL
  if (aRoute === 'K/T' && bRoute === 'K-OWL') return -1;
  if (aRoute === 'K-OWL' && bRoute === 'K/T') return 1;

  if (Number.isNaN(aInteger) && Number.isNaN(bInteger)) {
    return aAlpha < bAlpha ? -1 : 1;
  } else if (Number.isNaN(aInteger)) {
    return -1;
  } else if (Number.isNaN(bInteger)) {
    return 1;
  } else if (aInteger === bInteger) {
    return aAlpha < bAlpha ? -1 : 1;
  }
  return aInteger - bInteger;
}
