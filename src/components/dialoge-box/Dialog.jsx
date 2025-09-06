import React from "react";

const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  confirmButtonClass = "bg-red-600 hover:bg-red-700 text-white",
  cancelButtonClass = "text-gray-700 bg-gray-100 hover:bg-gray-200",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200/40 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="text-gray-600 mb-6">{children}</div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${cancelButtonClass}`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
