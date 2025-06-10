import React from 'react';
import { Modal } from 'react-bootstrap';

// Modal.setAppElement('#root'); // Important for accessibility

const PreviewModal = ({ isOpen, onClose, fileUrl, format }) => {
  console.log({ isOpen, onClose, fileUrl, format })
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      size='lg'
      // ariaHideApp={false}
      // contentLabel="Preview"
      // className="preview-modal"
    >
      <button className="close-btn" onClick={onClose}>✕</button>
      <div className="preview-content">
        {format === 'image' ? (
          <img src={fileUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        ) : format === 'video' ? (
          <video src={fileUrl} controls style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        ) : (
          <p>Unsupported format</p>
        )}
      </div>
    </Modal>
  );
};

export default PreviewModal;
