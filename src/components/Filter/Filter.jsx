import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../../redux/filtersSlice";
import { getCarBrands } from "../../services/api";
import css from "./Filter.module.css";

export default function Filter({ onFilterChange }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState(filters.brand);
  const [price, setPrice] = useState(filters.price);
  const [minMileage, setMinMileage] = useState(filters.minMileage);
  const [maxMileage, setMaxMileage] = useState(filters.maxMileage);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getCarBrands();
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch car brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({
      brand,
      price,
      minMileage,
      maxMileage,
    });
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");
    onFilterChange({
      brand: "",
      price: "",
      minMileage: "",
      maxMileage: "",
    });
  };

  const priceOptions = Array.from({ length: 51 }, (_, i) => i * 10).map(
    (value) => ({
      value: value.toString(),
      label: `To ${value}$`,
    })
  );

  return (
    <form onSubmit={handleSubmit} className={css.filter}>
      <div className={css.field}>
        <label className={css.label}>
          Car brand
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className={css.select}
          >
            <option value="">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={css.field}>
        <label className={css.label}>
          Price/1 hour
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={css.select}
          >
            <option value="">All prices</option>
            {priceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={css.field}>
        <label className={css.label}>
          Car mileage/km
          <div className={css.mileageInputs}>
            <input
              type="number"
              value={minMileage}
              onChange={(e) => setMinMileage(e.target.value)}
              placeholder="From"
              className={css.input}
            />
            <input
              type="number"
              value={maxMileage}
              onChange={(e) => setMaxMileage(e.target.value)}
              placeholder="To"
              className={css.input}
            />
          </div>
        </label>
      </div>
      <div className={css.buttons}>
        <button type="submit" className={css.submitButton}>
          Search
        </button>
        <button type="button" onClick={handleReset} className={css.resetButton}>
          Reset
        </button>
      </div>
    </form>
  );
}
