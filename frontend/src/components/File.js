import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'bootstrap/dist/css/bootstrap.min.css';

// Set the worker URL for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function File() {
 const [selectedFile, setSelectedFile] = useState(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [numPages, setNumPages] = useState(null);

 const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
 };

 const handlePreview = () => {
    if (selectedFile) {
      setIsModalOpen(true);
    } else {
      alert('No file selected. Please choose a file first.');
    }
 };

 const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
 };

 const renderPages = () => {
    if (numPages) {
      const pages = [];
      for (let index = 1; index <= numPages; index++) {
        pages.push(
          <Page
            key={`page_${index}`}
            pageNumber={index}
          />
        );
      }
      return pages;
    }
    return null;
 };

 return (
    <div>
      <h1>Open and Preview File</h1>
      <div className="form-group">
        <input type="file" onChange={handleFileChange} />
      </div>
      <button className="btn btn-primary" onClick={handlePreview}>Preview File</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeModal}>Close</button>
            {selectedFile && selectedFile.type === 'application/pdf' ? (
              <div>
                <Document file={URL.createObjectURL(selectedFile)} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                 {renderPages()}
                </Document>
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