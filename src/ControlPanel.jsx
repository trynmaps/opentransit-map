import React, { Component } from 'react';
import { DateTimePicker } from 'react-widgets';
import Toggle from 'react-toggle';
import propTypes from 'prop-types';
import Checkbox from './Checkbox';
import muniRoutesGeoJson from './res/muniRoutes.geo.json';
// import Map from './Map';

const notAlpha = /[^a-zA-Z]/g;

/*
Sort by putting letters before numbers and treat number strings as integers.
Calling Array.prototype.sort() without a compare function sorts elements as
strings by Unicode code point order, e.g. [2, 12, 13, 9, 1, 27].sort() returns
[1, 12, 13, 2, 27, 9]
*/
function sortAlphaNumeric(a, b) {
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


// make a copy of routes and sort
const sortedRoutes = muniRoutesGeoJson.features.slice(0).sort(sortAlphaNumeric);

class ControlPanel extends Component {
  constructor() {
    super();
    this.state = {
      currentStateTime: new Date(Date.now()),
    };
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

  render() {
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
            defaultChecked
            onChange={() => this.props.toggleStops()}
          />
        </div>
        <div className="routes-header">
          <h3>Routes</h3>
        </div>
        <ul className="list-group">
          {sortedRoutes.map(route => (
            <Checkbox
              route={route}
              label={route.properties.name}
              handleCheckboxChange={checkedRoute => this.props.filterRoutes(checkedRoute)}
              key={route.id}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ControlPanel.propTypes = {
  relay: propTypes.element.isRequired,
  filterRoutes: propTypes.element.isRequired,
  toggleStops: propTypes.element.isRequired,
};

export default ControlPanel;
