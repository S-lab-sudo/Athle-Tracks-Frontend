import React from 'react';

function Modal({ children, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
      <div className="bg-white p-6 rounded shadow-lg relative h-[90vh] overflow-y-auto w-[80vw]">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;