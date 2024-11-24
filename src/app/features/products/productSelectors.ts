import { RootState } from '../../store/redux-store';

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsLoading = (state: RootState) =>
  state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
