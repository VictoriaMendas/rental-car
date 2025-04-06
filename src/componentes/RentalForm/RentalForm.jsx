import { useState } from "react";
import { getCarById } from "../../services/api";
import styles from "./RentalForm.module.css";

function RentalForm({ carId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getCarById(carId, {
        name,
        email,
        startDate,
        endDate,
      });
      setMessage(response.message);
    } catch (error) {
      setMessage(error.message("Error renting car. Please try again."));
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>Rent This Car</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Rent Now</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default RentalForm;
