import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";
import FavoritesCarsPage from "./pages/FavoritesCarsPage/FavoritesCarsPage";
import styles from "./App.module.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/favorites" element={<FavoritesCarsPage />} />
          <Route path="/catalog/:id" element={<CarDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
