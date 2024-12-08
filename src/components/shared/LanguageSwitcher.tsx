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
    <div>
      <button
        onClick={() => handleLanguageChange('en')}
        disabled={language === 'en'}
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange('fr')}
        disabled={language === 'fr'}
      >
        French
      </button>
    </div>
  );
};

export default LanguageSwitcher;
