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
    handleCheckboxChange(route);
  }

  render() {
    const { isChecked } = this.state;
    const { label } = this.props;

    return (
      <div className="checkbox">
        <label htmlFor="input">
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={() => this.toggleCheckboxChange()}
          />
          {label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
