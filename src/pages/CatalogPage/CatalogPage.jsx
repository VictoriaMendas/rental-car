import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCars, appendCars, resetCars, setPage } from "../../redux/carsSlice";

import Filter from "../../componentes/Filter/Filter.jsx";
import CarCard from "../../componentes/CarCard/CarCard.jsx";
import styles from "./CatalogPage.module.css";
import { setFilters } from "../../redux/filtersSlice";
import { fetchCarsByParams } from "../../redux/carsOps.js";

function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.items);
  const page = useSelector((state) => state.cars.page);
  const totalPages = useSelector((state) => state.cars.totalPages);
  const filters = useSelector((state) => state.filters);
  const isLoading = useSelector((state) => state.cars.isLoading);

  useEffect(() => {
    dispatch(fetchCarsByParams({ page, filters }));
  }, [filters, dispatch, page]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(resetCars());
  };

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };
  console.log("hasMore:", totalPages);
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
      {!isLoading && page < totalPages && (
        <button onClick={handleLoadMore} className={styles.loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default CatalogPage;
