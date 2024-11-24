import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure
} from './productSlice';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchProductsStart());
      const response = await axios.get('/api/products');
      dispatch(fetchProductsSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchProductsFailure(error.message));
    }
  }
);
