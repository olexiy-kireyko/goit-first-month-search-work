import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global';

export const getCars = createAsyncThunk('cars/getCars', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/cars', {
      params: {
        limit: 12,
        page: 1,
      },
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const getFilteredCars = createAsyncThunk(
  'cars/getFilteredCars',
  async (values, thunkAPI) => {
    const { brand, rentalPrice, minMileage, maxMileage } = values;
    try {
      const response = await axios.get('/cars', {
        params: {
          brand,
          rentalPrice,
          minMileage,
          maxMileage,
          limit: 12,
          page: 1,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getMoreCars = createAsyncThunk(
  'cars/getMoreCars',
  async (values, thunkAPI) => {
    const { brand, rentalPrice, minMileage, maxMileage, page } = values;
    try {
      const response = await axios.get('/cars', {
        params: {
          brand,
          rentalPrice,
          minMileage,
          maxMileage,
          limit: 12,
          page,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getBrands = createAsyncThunk(
  'cars/getBrands',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/brands');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getCar = createAsyncThunk('cars/getCar', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`/cars/${id}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
