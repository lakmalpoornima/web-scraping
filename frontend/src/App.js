import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Table from './components/Table'
import Form from './components/Form'
import File from './components/File'

function App() {
  return (

<BrowserRouter>
<Sidebar>
   <Routes>
         <Route path="/" element={<Table />} />
         <Route path="/form" element={<Form />} />
         <Route path="/file" element={<File />} />
    </Routes>
</Sidebar>

</BrowserRouter>
 );
}

export default App;
