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

export default Stop;
