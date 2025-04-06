import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles.banner}>
        <div className={styles.hero}>
          <h1 className={styles.h1}>Find Your perfect Rental Car</h1>
          <p className={styles.heroTitles}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link to="/catalog">
            <button className={styles.ctaButton}>View Catalog</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
