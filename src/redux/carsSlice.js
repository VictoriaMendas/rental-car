import { createSlice } from "@reduxjs/toolkit";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    page: 1,
    hasMore: true,
  },
  reducers: {
    setCars: (state, action) => {
      state.items = action.payload.cars;
      state.page = 1;
      state.hasMore = action.payload.length > 0;
    },
    appendCars: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.page += 1;
      state.hasMore = action.payload.length > 0;
    },
    resetCars: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
});

export const { setCars, appendCars, resetCars } = carsSlice.actions;
export default carsSlice.reducer;
