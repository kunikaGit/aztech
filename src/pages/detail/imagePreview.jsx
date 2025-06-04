import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Important for accessibility

const PreviewModal = ({ isOpen, onClose, fileUrl, format }) => {
    console.log({ isOpen, onClose, fileUrl, format })
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
        ariaHideApp={false}  
      contentLabel="Preview"
      className="preview-modal"
      overlayClassName="preview-overlay"
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
