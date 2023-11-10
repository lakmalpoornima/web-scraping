import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Sidebar = () => {
 const [active, setActive] = useState(1);

 const toggle = tab => {
    if (active !== tab) setActive(tab);
 };

 return (
    <div className="sidebar">
      <ul className="menu">
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
      </ul>
    </div>
 );
};

export default Sidebar;