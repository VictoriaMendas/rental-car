import { useDispatch, useSelector } from "react-redux";
import CarList from "../../components/CarList/CarList";
import { setPage } from "../../redux/carsSlice";
import { fetchCars } from "../../redux/carsOps";
import { setFilters } from "../../redux/filtersSlice";
import { useEffect } from "react";
import styles from "./FavoritesCarsPage.module.css";
import Filter from "../../components/Filter/Filter";

const FavoritesCarsPage = () => {
  const favorites = useSelector((state) => state.cars.favorites);
  const dispatch = useDispatch();
  // const cars = useSelector((state) => state.cars.cars);
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
    <div className={styles.carFilterFav}>
      <Filter onFilterChange={handleFilterChange} />
      <CarList cars={favorites} className={styles.carListFav} />
      {!isLoading && page < totalPages && (
        <button onClick={handleLoadMore} className={styles.loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};
export default FavoritesCarsPage;
