import React, { Component } from 'react';
// import Map from './Map';

class Header extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <nav className="header">
        <div className="input-group">
          <div className="input-group-prepend my-2">
            <a className="btn" href="#sidebar" data-toggle="collapse" data-target="#sidebar">
              &#9776;
            </a>
          </div>
          <input type="text" className="form-control m-2 ml-0" />
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
};

export default Header;
