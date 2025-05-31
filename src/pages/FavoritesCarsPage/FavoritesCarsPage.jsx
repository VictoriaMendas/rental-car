import { useSelector } from "react-redux";
import CarList from "../../components/CarList/CarList";

const FavoritesCarsPage = () => {
  const favorites = useSelector((state) => state.cars.favorites);
  return (
    <div>
      <CarList cars={favorites} />
    </div>
  );
};
export default FavoritesCarsPage;
