import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCars } from "../services/api";

export const fetchCarsByParams = createAsyncThunk(
  "cars/fetchCarsByParams",
  async ({ page, filters }, thunkApi) => {
    try {
      const response = await fetchCars(page, filters);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
