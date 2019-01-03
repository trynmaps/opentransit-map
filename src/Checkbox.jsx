import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
    };
  }

  toggleCheckboxChange() {
    const { handleCheckboxChange, route } = this.props;
    this.setState({
      isChecked: !this.state.isChecked,
    });
    console.log('testings2', route);
    handleCheckboxChange(route);
  }

  render() {
    const { isChecked } = this.state;
    const { label } = this.props;
    const activeLabelClass = isChecked ? 'active' : '';
    return (
      <li className={`list-group-item ${activeLabelClass}`}>
        <label htmlFor="input">
          <input
            className="route-input"
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={() => this.toggleCheckboxChange()}
          />
          {label}
        </label>
      </li>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  route: PropTypes.shape().isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
