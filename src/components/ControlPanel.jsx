import React, { Component } from 'react';
import { DateTimePicker } from 'react-widgets';
import Toggle from 'react-toggle';
import propTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Checkbox from './Checkbox';
import sortAlphaNumeric from '../helpers/sortingHelper';
import cities from '../Cities.json';

class ControlPanel extends Component {
  constructor() {
    super();
    const initialCity = cities[0]; // San Francisco
    this.state = {
      currentStateTime: new Date(Date.now()),
      selectedCity: initialCity,
      sortedRoutes: this.getCityRoutes(initialCity),
    };
  }

  getCityRoutes(city) {
    const cityGeoJson = require('../res/' + city.path); // eslint-disable-line
    return cityGeoJson.features.slice(0).sort(sortAlphaNumeric);
  }

  refetch() {
    this.props.refetch({
      agency: this.state.selectedCity.agency,
      startTime: this.state.currentStateTime - 15000,
      endTime: this.state.currentStateTime,
    });
  }

  render() {
    return (
      <div className="control-panel">
        <div className="routes-header">
          <h3>Time</h3>
          <DateTimePicker
            value={this.state.currentStateTime}
            onChange={newTime => this.setState({
              currentStateTime: newTime,
            }, () => this.refetch())}
          />
        </div>
        <div className="routes-header stops-toggle">
          <h3>Stops</h3>
          <Toggle
            defaultChecked
            onChange={() => this.props.toggleStops()}
          />
        </div>
        <div className="routes-header city-dropdown">
          <h3>Cities</h3>
          <Dropdown
            options={cities.map(city => ({
              label: city.name,
              value: city,
            }))}
            onChange={city => this.setState({
              selectedCity: city.value,
              sortedRoutes: this.getCityRoutes(city.value),
            }, () => {
              this.props
                .setMapLocation(city.value.latitude, city.value.longitude, 11);
              this.props.clearSelectedRoutes();
              this.refetch();
            })
            }
            value={this.state.selectedCity.name}
            placeholder="Select a city"
          />
        </div>
        <div className="routes-header">
          <h3>Routes</h3>
        </div>
        <ul className="list-group">
          {this.state.sortedRoutes.map(route => (
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
  filterRoutes: propTypes.func.isRequired,
  toggleStops: propTypes.func.isRequired,
  setMapLocation: propTypes.func.isRequired,
  refetch: propTypes.func.isRequired,
  clearSelectedRoutes: propTypes.func.isRequired,
};

export default ControlPanel;
