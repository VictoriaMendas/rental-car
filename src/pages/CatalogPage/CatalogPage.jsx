import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCars, appendCars, resetCars } from "../../redux/carsSlice";

import { fetchCars } from "../../services/api";
import Filter from "../../componentes/Filter/Filter.jsx";
import CarCard from "../../componentes/CarCard/CarCard.jsx";
import styles from "./CatalogPage.module.css";
import { setFilters } from "../../redux/filtersSlice";

function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.items);
  const page = useSelector((state) => state.cars.page);
  const hasMore = useSelector((state) => state.cars.hasMore);
  const filters = useSelector((state) => state.filters);

  const loadCars = useCallback(
    async (newFilters = filters, reset = false) => {
      try {
        if (reset) {
          dispatch(resetCars());
        }
        const data = await fetchCars(reset ? 1 : page, newFilters);
        if (reset) {
          dispatch(setCars(data));
        } else {
          dispatch(appendCars(data));
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    },
    [dispatch, filters, page]
  );

  useEffect(() => {
    loadCars(filters, true);
  }, [filters, loadCars]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleLoadMore = () => {
    loadCars(filters, false);
  };
  console.log("hasMore:", hasMore);
  console.log("cars length:", cars.length);
  console.log("current page:", page);
  console.log("filters:", filters);
  return (
    <div className={styles.catalog}>
      <Filter onFilterChange={handleFilterChange} />
      <div className={styles.carList}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      {hasMore && (
        <button onClick={handleLoadMore} className={styles.loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default CatalogPage;
