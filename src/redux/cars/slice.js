import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getBrands,
  getCar,
  getCars,
  getFilteredCars,
  getMoreCars,
} from './operations';

const handlePending = state => {
  state.loading = true;
};
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    page: null,
    totalPages: null,

    car: null,

    brands: [],

    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.items = action.payload.cars;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getFilteredCars.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.items = action.payload.cars;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getMoreCars.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.items = [...state.items, ...action.payload.cars];
        state.page = action.payload.page;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.brands = action.payload;
      })
      .addCase(getCar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.car = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getMoreCars.pending,
          getFilteredCars.pending,
          getCar.pending,
          getCars.pending,
          getBrands.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          getMoreCars.rejected,
          getFilteredCars.rejected,
          getCar.rejected,
          getCars.rejected,
          getBrands.rejected
        ),
        handleRejected
      );
  },
});

export default carsSlice.reducer;
