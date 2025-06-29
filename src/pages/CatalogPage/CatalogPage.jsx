
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../redux/carsSlice";
import { setFilters } from "../../redux/filtersSlice";
import Filter from "../../components/Filter/Filter";
import CarList from "../../components/CarList/CarList";
import styles from "./CatalogPage.module.css";
import { fetchCars } from "../../redux/carsOps";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const page = useSelector((state) => state.cars.page);
  const totalPages = useSelector((state) => state.cars.totalPages);
  const filters = useSelector((state) => state.filters);
  const isLoading = useSelector((state) => state.cars.isLoading);

  useEffect(() => {
    dispatch(fetchCars({ page, filters }));
  }, [dispatch, page, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(setPage(1));
  };

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className={styles.catalog}>
      <Filter onFilterChange={handleFilterChange} />
      <CarList cars={cars} />
      {!isLoading && page < totalPages && (
        <button onClick={handleLoadMore} className={styles.loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}
