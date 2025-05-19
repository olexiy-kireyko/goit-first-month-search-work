import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: { brand: '', rentalPrice: '', minMileage: '', maxMileage: '' },
  reducers: {
    changeFilters(state, action) {
      state.brand = action.payload.brand;
      state.rentalPrice = action.payload.rentalPrice;
      state.minMileage = action.payload.minMileage;
      state.maxMileage = action.payload.maxMileage;
    },
  },
});

export const { changeFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
