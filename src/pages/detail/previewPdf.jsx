// --- IMPORTS ---
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './detail.scss';

// Use the exact matching version on CDN for pdfjs-dist 2.14.305:
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js`;
// --- COMPONENT ---
const PdfPreview = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handleNext = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const handlePrev = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const progressPercentage = ((pageNumber / numPages) * 100).toFixed(0);

  return (
    <div className="pdf-preview-container">
      <div className="pdf-header">
        <span>Page {pageNumber} of {numPages}</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="pdf-document">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="loading">Loading PDF...</div>}
          error={<div className="error">Failed to load PDF</div>}
        >
          <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </div>

      <div className="pdf-controls">
        <button disabled={pageNumber <= 1} onClick={handlePrev}>Previous</button>
        <button disabled={pageNumber >= numPages} onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default PdfPreview;
