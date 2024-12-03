import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routerPaths } from './router-paths';
import { Provider } from 'react-redux';
import { store } from './app/store/redux-store';
import Toast from './components/shared/Toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Toast />
    <RouterProvider router={routerPaths} />
  </Provider>
);
