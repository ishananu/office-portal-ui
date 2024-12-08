import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routerPaths } from './router-paths';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './app/store/redux-store';
import Toast from './components/shared/Toast';
import { I18nextProvider } from 'react-i18next';
import i18n from './app/features/localization/i18n/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const LanguageUpdater = () => {
  const language = useSelector(
    (state: RootState) => state.localization.language
  );
  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  return null;
};

root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <LanguageUpdater />
      <Toast />
      <RouterProvider router={routerPaths} />
    </I18nextProvider>
  </Provider>
);
