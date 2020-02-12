import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          Debian Control File Viewer
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <NavLink className="nav-item nav-link" to="/packages">
              Home
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
