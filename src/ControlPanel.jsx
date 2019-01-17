import React, { Component } from 'react';
import { DateTimePicker } from 'react-widgets';
import Toggle from 'react-toggle';
import propTypes from 'prop-types';
import Checkbox from './Checkbox';
import muniRoutesGeoJson from './res/muniRoutes.geo.json';
import { sortAlphaNumeric } from './Util';

// make a copy of routes and sort
const sortedRoutes = muniRoutesGeoJson.features.slice(0).sort(sortAlphaNumeric);
const liveDataInterval = 15000;

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
    this.props.fetchData(newStateTime, liveDataInterval);
  }

  handleLiveData() {
    setTimeout(() => {
      this.setNewStateTime(new Date());
    }, liveDataInterval);
  }

  render() {
    const { liveMap } = this.state;
    if (liveMap) {
      this.handleLiveData();
    }
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
            onChange={() => this.setState({ liveMap: !liveMap })}
          />
        </div>
        <div className="routes-header stops-toggle">
          <h3>Stops</h3>
          <Toggle
            defaultChecked={this.state.showStops}
            onChange={() => this.props.toggleStops()}
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
  filterRoutes: propTypes.element.isRequired,
  toggleStops: propTypes.element.isRequired,
  fetchData: propTypes.element.isRequired,
};

export default ControlPanel;
