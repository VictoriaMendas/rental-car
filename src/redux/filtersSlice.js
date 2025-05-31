import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    brand: "",
    price: "",
    minMileage: "",
    maxMileage: "",
  },
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: (state) => {
      state.brand = "";
      state.price = "";
      state.minMileage = "";
      state.maxMileage = "";
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
