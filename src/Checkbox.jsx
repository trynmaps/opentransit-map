import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class Checkbox extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
    }
  }

  toggleCheckboxChange() {
    const { handleCheckboxChange, route } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(route);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
	            type="checkbox"
	            value={label}
	            checked={isChecked}
	            onChange={this.toggleCheckboxChange}
	        />

          {label}
        </label>
      </div>
    );
  }
}

/*Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};*/

export default Checkbox;
