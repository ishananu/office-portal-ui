import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routerPaths } from './router-paths';
import { Provider } from 'react-redux';
import { store } from './app/store/redux-store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={routerPaths} />
  </Provider>
);
