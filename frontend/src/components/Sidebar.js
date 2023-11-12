import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Sidebar = () => {
 const [active, setActive] = useState(1);

 const toggle = tab => {
    if (active !== tab) setActive(tab);
 };

 return (
  <div>
    <div className="sidebar">
      {/* <ul className="menu">
        <li
          className={active === 1 ? 'active' : null}
          onClick={() => toggle(1)}
        >
          <Link to="/">Table</Link>
        </li>
        <li
          className={active === 2 ? 'active' : null}
          onClick={() => toggle(2)}
        >
          <Link to="/form">Form</Link>
        </li>
        <li
          className={active === 3 ? 'active' : null}
          onClick={() => toggle(3)}
        >
          <Link to="/file">File</Link>
        </li>
      </ul> */}
    </div>
    <div>
    <div class="sidebar" role="cdb-sidebar">
  <div class="sidebar-container">
    <div class="sidebar-header">
      <a class="sidebar-brand">Contrast</a>
      <a class="sidebar-toggler"><i class="fa fa-bars"></i></a>
    </div>
    <div class="sidebar-nav">
      <div class="sidenav">
        <a class="sidebar-item">
          <div class="sidebar-item-content">
            <i class="fa fa-th-large sidebar-icon sidebar-icon-lg"></i>
            <span>Dashboard</span>
            <div class="suffix">
              <div class="badge rounded-pill bg-danger">new</div>
            </div>
          </div>
        </a>
        <a class="sidebar-item">
          <div class="sidebar-item-content">
            <i class="fa fa-sticky-note sidebar-icon"></i>
            <span>Components</span>
          </div>
        </a>
        <a class="sidebar-item">
          <div class="sidebar-item-content">
            <i class="fa fa-sticky-note sidebar-icon"></i>
            <span>Bootstrap</span>
          </div>
        </a>
      </div>
      <div class="sidebar-footer">Sidebar Footer</div>
    </div>
  </div>
</div>
    </div>
    </div>
 );
};

export default Sidebar;