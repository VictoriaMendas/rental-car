import axios from "axios";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
});

export const fetchCars = async (page = 1, filters = {}) => {
  const { brand, price, mileageFrom, mileageTo } = filters;
  const params = {
    page,
    limit: 12,
    ...(brand && { brand }),
    ...(price && { rentalPrice: price }),
    ...(mileageFrom && { minMileage: mileageFrom }),
    ...(mileageTo && { maxMileage: mileageTo }),
  };
  const response = await api.get("/cars", { params });
  return response.data;
};

export const getCarById = async (carId) => {
  const { data } = await api.get(`/cars/${carId}`);

  return data;
};
export const getCarBrands = async () => {
  const { data } = await api.get("/brands");

  return data;
};
