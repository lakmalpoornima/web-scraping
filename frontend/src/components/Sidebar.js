import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../src/App.css';

const Sidebar = ({children}) => {
  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  const menuItem=[
      {
          path:"/",
          name:"Table",
          icon:<i class="bi bi-table"></i>
      },
      {
          path:"/form",
          name:"Form",
          icon:<i class="bi bi-input-cursor-text"></i>
      },
      {
          path:"/file",
          name:"File",
          icon:<i class="bi bi-file-earmark-arrow-up"></i>
      },
      
  ]

 return (
  <div className="containerr">
  <div style={{width: isOpen ? "200px" : "250px"}} className="sidebar">
      <div className="top_section">
          <h1 className="logo">WEB Scraping</h1>
          <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
          <i class="bi bi-list" onClick={toggle}></i>
          </div>
      </div>
      {
          menuItem.map((item, index)=>(
              <NavLink to={item.path} key={index} className="link" activeclassName="active">
                  <div className="icon">{item.icon}</div>
                  <div className="link_text">{item.name}</div>
              </NavLink>
          ))
      }
  </div>
  <main>{children}</main>
</div>
// style={{display: isOpen ? "block" : "none"}} 
 );
};

export default Sidebar;