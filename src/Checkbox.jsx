// @flow

import React, { Component } from 'react';

type Props = {
  label: string,
  route: any,
  handleCheckboxChange: (*) => void,
}

type State = {
  isChecked: boolean,
}
class Checkbox extends Component<Props, State> {
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

export default Checkbox;
