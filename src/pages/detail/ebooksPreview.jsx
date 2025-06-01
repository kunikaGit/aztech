// components/EbookPreviewModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


Modal.setAppElement('#root'); // Important for accessibility

const EbookPreviewModal = ({ isOpen, onClose, sampleUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Ebook Preview"
      className="preview-modal"
      overlayClassName="preview-overlay"
    >
      <h2>Preview</h2>

      <Document
        file={sampleUrl}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          setPageNumber(1);
        }}
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <div className="navigation">
        <button onClick={() => setPageNumber(p => Math.max(p - 1, 1))}>⬅ Prev</button>
        <span>{pageNumber} / {numPages}</span>
        <button onClick={() => setPageNumber(p => Math.min(p + 1, numPages))}>Next ➡</button>
      </div>

      <button onClick={onClose} className="close-btn">Close</button>
    </Modal>
  );
};

export default EbookPreviewModal;
