import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from '@heroicons/react/20/solid';
import { removeToast } from '../../app/features/toast/toastSlice';
import { AppDispatch, RootState } from '../../app/store/redux-store';

const Toast: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  console.log('Current toasts:', toasts); // Debugging output

  const getIcon = (type: 'success' | 'danger' | 'warning') => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'danger':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    toasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => {
          dispatch(removeToast(toast.id));
        }, toast.duration);
        timers.push(timer);
      }
    });
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts, dispatch]);

  return (
    <div className="fixed top-5 right-5 space-y-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center p-4 max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
            {getIcon(toast.type)}
          </div>
          <div className="ml-3 text-sm font-normal">{toast.message}</div>
          <button
            onClick={() => dispatch(removeToast(toast.id))}
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <XMarkIcon className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
