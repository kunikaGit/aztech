import React from 'react';
import { Modal } from 'react-bootstrap';

// Modal.setAppElement('#root'); // Important for accessibility

const PreviewModal = ({ isOpen, onClose, fileUrl, format }) => {

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      size='lg'
      // ariaHideApp={false}
      // contentLabel="Preview"
      // className="preview-modal"
    >
      <button className="close-btn" onClick={onClose}>x</button>
      <div className="preview-content">
      
        { format == 'ppt' || format == 'pptx' ? (
  <iframe
    src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
    style={{ width: '100%', height: '80vh', border: 'none' }}
    title="PowerPoint Preview"
    allowFullScreen
  />
) : format === 'image' ? (
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
