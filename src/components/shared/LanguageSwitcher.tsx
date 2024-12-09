import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/redux-store';
import { setLanguage } from '../../app/features/localization/localizationSlice';

const LanguageSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(
    (state: RootState) => state.localization.language
  );

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
  };

  return (
    <div className="flex flex-row justify-end">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:text-white ${
          language === 'en' ? 'bg-gray-700' : ''
        }`}
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange('fr')}
        className={`block rounded-md px-3 py-2 text-base font-medium text-gray-400  hover:text-white ${
          language === 'fr' ? 'bg-gray-700' : ''
        }`}
      >
        French
      </button>
    </div>
  );
};

export default LanguageSwitcher;
