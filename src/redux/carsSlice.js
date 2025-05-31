// import { createSlice } from "@reduxjs/toolkit";
// import { fetchCarsByParams } from "./carsOps";

// const carsSlice = createSlice({
//   name: "cars",
//   initialState: {
//     items: [],
//     page: 1,
//     totalPages: 0,
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCarsByParams.fulfilled, (state, action) => {
//         state.items = [...state.items, ...action.payload.cars];
//         state.page = Number(action.payload.page);
//         state.totalPages = action.payload.totalPages;
//         state.isLoading = false;
//       })
//       .addCase(fetchCarsByParams.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchCarsByParams.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
//   reducers: {
//     setCars: (state, action) => {
//       state.items = action.payload.cars;
//       state.page = 1;
//       state.totalPages = action.payload.totalPages;
//     },
//     appendCars: (state, action) => {
//       state.items = [...state.items, ...action.payload];
//       state.page += 1;
//     },
//     resetCars: (state) => {
//       state.items = [];
//       state.page = 1;
//       state.totalPages = 0;
//     },
//     setPage: (state, action) => {
//       state.page = action.payload;
//     },
//   },
// });

// export const { setCars, appendCars, resetCars, setPage } = carsSlice.actions;
// export default carsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById } from "./carsOps";

const initialState = {
  cars: [],
  favorites: [],
  selectedCar: null,
  isLoading: false,
  error: null,
  page: 1,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(
        (car) => car.id !== action.payload
      );
    },
    incrementPage(state) {
      state.page += 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (state.page === 1) {
          state.cars = action.payload.cars;
        } else {
          state.cars = [...state.cars, ...action.payload.cars];
        }
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addToFavorites, removeFromFavorites, incrementPage, setPage } =
  carsSlice.actions;
export default carsSlice.reducer;
