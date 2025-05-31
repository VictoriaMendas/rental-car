import { Link } from "react-router-dom";
import css from "./CarList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/carsSlice";

export default function CarList({ cars }) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.cars.favorites);

  const handleFavoriteToggle = (car) => {
    const isFavorite = favorites.some((favCar) => favCar.id === car.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(car.id));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  return (
    <ul className={css.list}>
      {cars.map((car) => {
        // Форматування пробігу з пробілом (наприклад, 5000 -> 5 000)
        const formattedMileage = car.mileage
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        return (
          <li key={car.id} className={css.carCard}>
            <div className={css.imageWrapper}>
              <img
                src={car.img || "https://via.placeholder.com/290x200"}
                alt={`${car.make} ${car.model}`}
                className={css.carImage}
              />
              <button
                onClick={() => handleFavoriteToggle(car)}
                className={css.favoriteButton}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill={
                    favorites.some((favCar) => favCar.id === car.id)
                      ? "#3470FF"
                      : "none"
                  }
                  stroke="#fff"
                >
                  <path d="M15.63 3.4575C15.2469 3.07336 14.7921 2.77027 14.2915 2.56281C13.7909 2.35534 13.2544 2.24736 12.7125 2.24499C12.1705 2.24262 11.6331 2.34588 11.1305 2.54993C10.6278 2.75398 10.1707 3.05533 9.78375 3.43875L9 4.2225L8.21625 3.43875C7.84282 3.05589 7.38859 2.75488 6.8875 2.55131C6.3864 2.34774 5.84974 2.24472 5.30812 2.24699C4.76651 2.24927 4.22984 2.35687 3.72874 2.564C3.22764 2.77114 2.77281 3.07389 2.38937 3.4575C1.60562 4.24125 1.16625 5.2875 1.16625 6.375C1.16625 7.4625 1.60562 8.50875 2.38937 9.2925L9 15.9037L15.6106 9.2925C15.9943 8.90938 16.2976 8.45484 16.5053 7.95445C16.713 7.45405 16.8212 6.91782 16.8237 6.375C16.8262 5.83218 16.7229 5.29495 16.5193 4.79355C16.3157 4.29215 16.0153 3.83625 15.63 3.4575Z" />
                </svg>
              </button>
            </div>
            <div className={css.carInfo}>
              <div className={css.carTitle}>
                <span>
                  {car.make} <span className={css.carModel}>{car.model}</span>,{" "}
                  {car.year}
                </span>
                <span className={css.carPrice}>{car.rentalPrice}</span>
              </div>
              <div className={css.carDetails}>
                <span>
                  {car.address.split(", ")[1]} | {car.address.split(", ")[2]} |{" "}
                  {car.rentalCompany}
                </span>
                <span>
                  {car.type} | {car.fuelConsumption} | {car.engineSize} |{" "}
                  {formattedMileage} km
                </span>
              </div>
            </div>
            <Link to={`/catalog/${car.id}`} className={css.learnMoreButton}>
              Learn More
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
