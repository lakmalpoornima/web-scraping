// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'bootstrap/dist/css/bootstrap.min.css';

// // Set the worker URL for pdf.js
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function File() {
//  const [selectedFile, setSelectedFile] = useState(null);
//  const [isModalOpen, setIsModalOpen] = useState(false);
//  const [numPages, setNumPages] = useState(null);

//  const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//  };

//  const handlePreview = () => {
//     if (selectedFile) {
//       setIsModalOpen(true);
//     } else {
//       alert('No file selected. Please choose a file first.');
//     }
//  };

//  const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedFile(null);
//  };

//  const renderPages = () => {
//     if (numPages) {
//       const pages = [];
//       for (let index = 1; index <= numPages; index++) {
//         pages.push(
//           <Page
//             key={`page_${index}`}
//             pageNumber={index}
//           />
//         );
//       }
//       return pages;
//     }
//     return null;
//  };

//  return (
//     <div>
//       <h1>Open and Preview File</h1>
//       <div className="form-group">
//         <input type="file" onChange={handleFileChange} />
//       </div>
//       <button className="btn btn-primary" onClick={handlePreview}>Preview File</button>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <button onClick={closeModal}>Close</button>
//             {selectedFile && selectedFile.type === 'application/pdf' ? (
//               <div>
//                 <Document file={URL.createObjectURL(selectedFile)} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
//                  {renderPages()}
//                 </Document>
//               </div>
//             ) : (
//               <p>This file type is not supported for preview.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//  );
// }

import React, { useState } from 'react';

export default function FileSubmit() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [numPages, setNumPages] = useState(null);
  const [isSupportedFormat, setIsSupportedFormat] = useState(true); // New state variable

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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setIsSupportedFormat(true); // Reset format check
  };

  const handleFileSubmit = () => {
    if (selectedFile) {
      // Check if the file format is supported (Excel or CSV)
      if (isSupportedFormat) {
//         const fileInput = document.getElementById('fileInput');
// const file = fileInput.files[0];
        // Perform the API request to submit the file
        // Replace the API URL with your actual endpoint
        const formData = new FormData();
formData.append('excelFile', selectedFile);

        fetch('http://localhost:4000/filesubmit/uploadAndAddData', {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              console.log('File submitted successfully');
              // You can add additional handling as needed
            } else {
              console.error('Failed to submit file');
            }
          })
          .catch((error) => {
            console.error('Error submitting file:', error);
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
      <div className="form-group">
        <input type="file" name="excelFile" id="fileInput" onChange={handleFileChange} />
      </div>
      <button className="btn btn-success" onClick={handleFileSubmit}>
        Submit File
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeModal}>Close</button>
            {selectedFile && selectedFile.type === 'application/pdf' ? (
              <div>
                <p>File preview here (PDF files)</p>
              </div>
            ) : (
              <p>This file type is not supported for preview.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
