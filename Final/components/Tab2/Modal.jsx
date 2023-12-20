// Modal.js
import React from "react";
import { MdCloseFullscreen } from "react-icons/md";
import "./Modal.css"; 

function Modal({ isOpen, children, closeModal }) {
  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-overlay"></div>
      <div className="modal-container">
        {children}
        <button className="modal-close-button" onClick={closeModal}>
          <MdCloseFullscreen />
        </button>
      </div>
    </div>
  );
}

export default Modal;
