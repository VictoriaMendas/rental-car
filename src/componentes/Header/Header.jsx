import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <div className={styles.logo}>
          <span className={styles.rental}>Rental</span>
          <span className={styles.car}>Car</span>
        </div>
      </NavLink>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
