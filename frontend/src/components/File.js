

import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

export default function FileSubmit() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSupportedFormat, setIsSupportedFormat] = useState(true); // New state variable
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const[modelShow,setModelShow] = useState(false)

  const onClick =() =>{
    setModelShow(true)
    console.log(modelShow)
  }
  const showAlert = (message) => {
    setAlertMessage(message);
  
    // Clear the alert after a few seconds
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000); // Adjust the time as needed
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Check if the file format is supported (Excel or CSV)
    if (
      file &&
      (file.type === 'application/vnd.ms-excel' ||
        file.type === 'text/csv' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      setIsSupportedFormat(true);
    } else {
      setIsSupportedFormat(false);
    }
  };

 

  const handleFileSubmit = () => {
    if (selectedFile) {
      if (isSupportedFormat) {
        setLoading(true);
        const formData = new FormData();
formData.append('excelFile', selectedFile);
        fetch('http://localhost:4000/filesubmit/uploadAndAddData', {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              console.log('File submitted successfully');
              showAlert('File submitted successfully');

            } else {
              console.error('Failed to submit file');
              showAlert('Failed to submit file');
            }
          })
          .catch((error) => {
            console.error('Error submitting file:', error);
          })
          .finally(() => {
            setLoading(false); // Set loading to false regardless of success or failure
          });
      } else {
        alert('Unsupported file format. Please select an Excel or CSV file.');
      }
    } else {
      alert('No file selected. Please choose a file first.');
    }
  };

  return (


    <div>
      <h1>Upload and Submit File</h1>
    <div className='row justify-content-evenly'>
      <div className='col-7'>
      
      <div className="form-group">
        <input type="file" name="excelFile" id="fileInput" onChange={handleFileChange} />
      </div>
      </div>
      <div className='col-4'> 
      <button className="btn btn-success" onClick={handleFileSubmit}>
        Submit File
      </button>
      </div>
    </div>
    <div className="loader-container">
    {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
        
        <div className="fixed-top">
    {alertMessage && (
  <div className={`alert ${alertMessage.includes('success') ? 'alert-success' : 'alert-danger'}`}>
    {alertMessage}
  </div>
)}

    </div>
    </div>
  );
}
