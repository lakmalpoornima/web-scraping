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
      
      <div className='container-fluid'>
      <div className='row'>
        <div className='bg-dark col-auto col-md-3 min-vh-100 d-flex  flex-column'>
          <a className='text-decoration-none text-white d-none d-sm-inline d-flex allign-itemcenter ms-3 mt-2'>
            <span className='ms-1 fs-4'>WEB Scraping</span>
          </a>
          <hr/>
          <ul class="nav nav-pills flex-column mt-3 mt-sm-0">
            <li class="nav-item text-white fs-5 my-1 py-2 py-sm-0">
            <Link to="/" className='nav-link text-white'> 
            <span className='ms-2'>Table</span>
            </Link>
              
            
            </li>
            <li class="nav-item text-white fs-5 my-1 py-2 py-sm-0">
            <Link to="/form" className='nav-link text-white'> 
            <span className='ms-2'>Form</span>
            </Link> 
            </li>

            <li class="nav-item text-white fs-5 my-1 py-2 py-sm-0">
            <Link to="/file" className='nav-link text-white'>
               <span className='ms-2'>File</span>
            </Link>
            </li>
          </ul>
        </div>
      </div>

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
