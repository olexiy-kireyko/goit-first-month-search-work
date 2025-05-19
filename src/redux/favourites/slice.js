import { createSlice } from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: { items: [] },
  reducers: {
    changeFavourites(state, action) {
      const id = action.payload;

      const index = state.items.findIndex(item => item === id);
      if (index === -1) {
        state.items.push(id);
      } else {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { changeFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
