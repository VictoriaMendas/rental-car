import { createSlice } from "@reduxjs/toolkit";
import { fetchCarsByParams } from "./carsOps";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsByParams.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.cars];
        state.page = Number(action.payload.page);
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(fetchCarsByParams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarsByParams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  reducers: {
    setCars: (state, action) => {
      state.items = action.payload.cars;
      state.page = 1;
      state.totalPages = action.payload.totalPages;
    },
    appendCars: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.page += 1;
    },
    resetCars: (state) => {
      state.items = [];
      state.page = 1;
      state.totalPages = 0;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setCars, appendCars, resetCars, setPage } = carsSlice.actions;
export default carsSlice.reducer;
