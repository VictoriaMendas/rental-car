// import { useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCarById } from "../../redux/carsOps";
// import css from "./CarDetailsPage.module.css";

// export default function CarDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const car = useSelector((state) => state.cars.selectedCar);
//   const isLoading = useSelector((state) => state.cars.isLoading);
//   const error = useSelector((state) => state.cars.error);

//   useEffect(() => {
//     dispatch(fetchCarById(id));
//   }, [dispatch, id]);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!car) return <p>Car not found</p>;
//   console.log(car.rentalConditions);
//   const formattedMileage = car.mileage
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

//   return (
//     <div className={css.container}>
//       <div className={css.carHeader}>
//         <img
//           src={car.img || "https://via.placeholder.com/461x312"}
//           alt={`${car.model} ${car.model}`}
//           className={css.carImage}
//         />
//         <div className={css.carInfo}>
//           <h2 className={css.carTitle}>
//             {car.model} <span className={css.carModel}>{car.model}</span>,{" "}
//             {car.year}
//           </h2>
//           <div className={css.carDetails}>
//             <span>
//               {car.address.split(", ")[1]} | {car.address.split(", ")[2]} | Id:{" "}
//               {car.id}
//             </span>
//             <span>
//               Year: {car.year} | Type: {car.type}
//             </span>
//             <span>
//               Fuel Consumption: {car.fuelConsumption} | Engine Size:{" "}
//               {car.engineSize}
//             </span>
//           </div>
//           <p className={css.description}>{car.description}</p>
//         </div>
//       </div>

//       <div className={css.additionalInfo}>
//         <div className={css.accessories}>
//           <h3>Accessories and functionalities:</h3>
//           <p>
//             {car.accessories.join(" | ")} | {car.functionalities.join(" | ")}
//           </p>
//         </div>

//         <div className={css.rentalConditions}>
//           <h3>Rental Conditions:</h3>
//           <ul className={css.conditionsList}>
//             {car.rentalConditions.map((condition, index) => (
//               <li key={index}>
//                 {condition.includes(":") ? (
//                   <>
//                     {condition.split(": ")[0]}:{" "}
//                     <span>{condition.split(": ")[1]}</span>
//                   </>
//                 ) : (
//                   condition
//                 )}
//               </li>
//             ))}
//             <li>
//               Mileage: <span>{formattedMileage}</span>
//             </li>
//             <li>
//               Price: <span>{car.rentalPrice}</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <Link to={`tel:+380730000000`} className={css.rentalButton}>
//         Rental Car
//       </Link>
//     </div>
//   );
// }
import { useEffect, useState } from "react"; // Додаємо useState для модалки
import { useParams } from "react-router-dom"; // Прибираємо Link, бо замінюємо на button
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/carsOps";
import css from "./CarDetailsPage.module.css";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector((state) => state.cars.selectedCar);
  const isLoading = useSelector((state) => state.cars.isLoading);
  const error = useSelector((state) => state.cars.error);
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для модалки

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!car) return <p>Car not found</p>;
  console.log(car.rentalConditions);
  const formattedMileage = car.mileage
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className={css.container}>
      <div className={css.carHeader}>
        <img
          src={car.img || "https://via.placeholder.com/461x312"}
          alt={`${car.model} ${car.model}`}
          className={css.carImage}
        />
        <div className={css.carInfo}>
          <h2 className={css.carTitle}>
            {car.model} <span className={css.carModel}>{car.model}</span>,{" "}
            {car.year}
          </h2>
          <div className={css.carDetails}>
            <span>
              {car.address.split(", ")[1]} | {car.address.split(", ")[2]} | Id:{" "}
              {car.id}
            </span>
            <span>
              Year: {car.year} | Type: {car.type}
            </span>
            <span>
              Fuel Consumption: {car.fuelConsumption} | Engine Size:{" "}
              {car.engineSize}
            </span>
          </div>
          <p className={css.description}>{car.description}</p>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <div className={css.accessories}>
          <h3>Accessories and functionalities:</h3>
          <p>
            {car.accessories.join(" | ")} | {car.functionalities.join(" | ")}
          </p>
        </div>

        <div className={css.rentalConditions}>
          <h3>Rental Conditions:</h3>
          <ul className={css.conditionsList}>
            {car.rentalConditions.map((condition, index) => (
              <li key={index}>
                {condition.includes(":") ? (
                  <>
                    {condition.split(": ")[0]}:{" "}
                    <span>{condition.split(": ")[1]}</span>
                  </>
                ) : (
                  condition
                )}
              </li>
            ))}
            <li>
              Mileage: <span>{formattedMileage}</span>
            </li>
            <li>
              Price: <span>{car.rentalPrice}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Змінюємо Link на button для відкриття модалки */}
      <button onClick={() => setIsModalOpen(true)} className={css.rentalButton}>
        Rental Car
      </button>

      {/* Додаємо модалку */}
      {isModalOpen && (
        <div className={css.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={css.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              <svg className={css.closeIcon} viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M6 18L18 6" strokeWidth="2" />
              </svg>
            </button>

            <img
              src={car.img || "https://via.placeholder.com/461x248"}
              alt={`${car.model} ${car.model}`}
              className={css.modalImage}
            />

            <div className={css.carInfo}>
              <h2 className={css.carTitle}>
                {car.model} <span className={css.carModel}>{car.model}</span>,{" "}
                {car.year}
              </h2>
              <div className={css.carDetails}>
                <span>
                  {car.address.split(", ")[1]} | {car.address.split(", ")[2]} |
                  Id: {car.id}
                </span>
                <span>
                  Year: {car.year} | Type: {car.type}
                </span>
                <span>
                  Fuel Consumption: {car.fuelConsumption} | Engine Size:{" "}
                  {car.engineSize}
                </span>
              </div>
              <p className={css.description}>{car.description}</p>
            </div>

            <div className={css.additionalInfo}>
              <div className={css.accessories}>
                <h3>Accessories and functionalities:</h3>
                <p>
                  {car.accessories.join(" | ")} |{" "}
                  {car.functionalities.join(" | ")}
                </p>
              </div>

              <div className={css.rentalConditions}>
                <h3>Rental Conditions:</h3>
                <ul className={css.conditionsList}>
                  {car.rentalConditions.map((condition, index) => (
                    <li key={index}>
                      {condition.includes(":") ? (
                        <>
                          {condition.split(": ")[0]}:{" "}
                          <span>{condition.split(": ")[1]}</span>
                        </>
                      ) : (
                        condition
                      )}
                    </li>
                  ))}
                  <li>
                    Mileage: <span>{formattedMileage}</span>
                  </li>
                  <li>
                    Price: <span>{car.rentalPrice}</span>
                  </li>
                </ul>
              </div>
            </div>

            <a href="tel:+380730000000" className={css.rentalButton}>
              Rental Car
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
