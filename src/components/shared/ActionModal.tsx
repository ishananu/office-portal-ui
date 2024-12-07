import React from 'react';

interface ActionModalProps {
  isOpen: boolean;
  errorType: 'error' | 'warning' | 'success' | 'delete';
  message: string;
  showActions?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

const icons: { [key: string]: string } = {
  error: '❌',
  warning: '⚠️',
  success: '✅',
  delete: '🗑️'
};

const colors: { [key: string]: string } = {
  error: 'bg-red-100 text-red-600 border-red-400',
  warning: 'bg-yellow-100 text-yellow-600 border-yellow-400',
  success: 'bg-green-100 text-green-600 border-green-400',
  delete: 'bg-gray-100 text-gray-600 border-gray-400'
};

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  errorType,
  message,
  showActions = false,
  onConfirm,
  onCancel,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`w-96 p-4 border-l-4 rounded-md shadow-md bg-white ${colors[errorType]}`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{icons[errorType]}</span>
            <h3 className="text-lg font-bold capitalize">{errorType}</h3>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="mt-2">
          <p>{message}</p>
        </div>
        {showActions && (
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onCancel}
            >
              No
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              onClick={onConfirm}
            >
              Yes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionModal;
