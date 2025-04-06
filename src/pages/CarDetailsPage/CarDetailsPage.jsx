import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCars, getCarById } from "../../services/api.js";
import RentalForm from "../../componentes/RentalForm/RentalForm.jsx";
import styles from "./CarDetailsPage.module.css";

function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const data = await getCarById(id);
        console.log(data);
        setCar(data);
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };
    loadCar();
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <div className={styles.details}>
      <h1>
        {car.brand} {car.model}, {car.year}
      </h1>
      <img src={car.img} alt={car.make} className={styles.carImage} />
      <p>Price: {car.rentalPrice}</p>
      <p>
        Mileage: {car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
        km
      </p>
      <p>Description: {car.description}</p>
      <RentalForm carId={car.id} />
    </div>
  );
}

export default CarDetailsPage;
