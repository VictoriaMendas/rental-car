import { useState } from "react";
import styles from "./Filter.module.css";

function Filter({ onFilterChange }) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({
      brand,
      price,
      mileageFrom,
      mileageTo,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filter}>
      <div>
        <span> Car brand:</span>
        <label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Choose brand"
          />
        </label>
      </div>
      <div>
        <span>Price/1 hour</span>
        <label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Choose price"
          />
        </label>
      </div>
      <div>
        <span> Car mileage/km:</span>
        <label>
          <input
            type="number"
            value={mileageFrom}
            onChange={(e) => setMileageFrom(e.target.value)}
            placeholder="From"
          />
          <input
            type="number"
            value={mileageTo}
            onChange={(e) => setMileageTo(e.target.value)}
            placeholder="To"
          />
        </label>
      </div>
      <div>
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default Filter;
