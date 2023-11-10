import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Table from './components/Table'
import Form from './components/Form'
import File from './components/File'

function App() {
  return (
    
      <Router>
      <div className="App d-flex flex-nowrap">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
        <nav>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className='nav-item'>
              <Link to="/" className='nav-link text-white'>Table</Link>
            </li>
            <li className='nav-item'>
              <Link to="/form" className='nav-link text-white'>Form</Link>
            </li>
            <li className='nav-item'>
              <Link to="/file" className='nav-link text-white'>File</Link>
            </li>
          </ul>
        </nav>
        </div>

        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/form" element={<Form />} />
          <Route path="/file" element={<File />} />
        </Routes>
      </div>
    </Router>

      



   
  );
}

export default App;
