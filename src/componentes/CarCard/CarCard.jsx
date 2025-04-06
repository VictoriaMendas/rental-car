import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../redux/favoritesSlice.js";
import styles from "./CarCard.module.css";

function CarCard({ car }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((id) => id === car.id);

  const formatMileage = (mileage) => {
    return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  const handleToggleFavorite = () => {
    console.log(
      "Toggling favorite for car:",
      car.id,
      "Current isFavorite:",
      isFavorite
    );
    dispatch(toggleFavorite(car));
  };
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={styles.carImage}
        />
        <button
          onClick={handleToggleFavorite}
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.favorite : ""
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.63 3.4575C15.2469 3.07313 14.7921 2.77023 14.2915 2.56281C13.7909 2.35539 13.2544 2.24736 12.7125 2.24437C11.7471 2.24437 10.812 2.59437 9.99998 3.24687C9.18795 2.59437 8.25282 2.24437 7.28745 2.24437C6.74555 2.24736 6.20901 2.35539 5.70843 2.56281C5.20785 2.77023 4.75302 3.07313 4.36995 3.4575C2.11482 5.71313 2.11482 9.2865 4.36995 11.541L9.99998 17.171L15.63 11.541C17.8851 9.2865 17.8851 5.71313 15.63 3.4575Z"
              fill="transparent"
              stroke="fff"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <p className={styles.price}>{car.rentalPrice}$</p>
        </div>
        <p className={styles.details}>
          {car.address.split(", ").slice(-2).join(" | ")} | {car.rentalCompany}{" "}
          | {car.type} | {car.id} | {formatMileage(car.mileage)} km
        </p>
        <Link to={`/catalog/${car.id}`}>
          <button className={styles.readMore}>Read More</button>
        </Link>
      </div>
    </div>
  );
}
export default CarCard;
