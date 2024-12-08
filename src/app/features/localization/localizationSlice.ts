import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocalizationState {
  language: string;
}

const initialState: LocalizationState = {
  language: 'fr'
};

const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    }
  }
});

export const { setLanguage } = localizationSlice.actions;

export default localizationSlice.reducer;
