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
      liveDataInterval:15000,
    };
  }

  setNewStateTime(newStateTime) {
    const {fetchLiveData} = this.props;
    this.setState({ currentStateTime: newStateTime });
    fetchLiveData(new Date());

  handleLiveData(newStateTime) {
    const {liveDataInterval,liveMap} = this.state;
    const {fetchLiveData} = this.props;
    this.setState({ liveData: !liveData,currentStateTime:newStateTime });
    setTimeout(() => {
      fetchLiveData(new Date());
    }, liveDataInterval);
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
            onChange={() =>this.handleLiveData}
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
