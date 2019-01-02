import React, { Component } from 'react';
import { DateTimePicker } from 'react-widgets';
import Toggle from 'react-toggle';
import propTypes from 'prop-types';
import Checkbox from './Checkbox';
import muniRoutesGeoJson from './res/muniRoutes.geo.json';
import { sortAlphaNumeric } from './Util';

// make a copy of routes and sort
const sortedRoutes = muniRoutesGeoJson.features.slice(0).sort(sortAlphaNumeric);

class ControlPanel extends Component {
  constructor() {
    super();
    this.state = {
      currentStateTime: new Date(Date.now()),
      liveMap: false,
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
              handleCheckboxChange={checkedRoute => this.props.filter(checkedRoute)}
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
  filter: propTypes.element.isRequired,
};

export default ControlPanel;
