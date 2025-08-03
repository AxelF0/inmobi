// ModalDialog.js
import React from "react";
import "../styles/modal_dialog.css"; // Archivo CSS para el diálogo

const ModalDialog = ({ isOpen, onClose, title, message, type }) => {
  if (!isOpen) return null;

  const dialogClass = `modal-dialog ${type}`;

  return (
    <div className="modal-overlay">
      <div className={dialogClass}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;
