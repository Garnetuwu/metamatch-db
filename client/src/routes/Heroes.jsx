import { useLocation } from "react-router-dom";
import useHeroRequests from "../hooks/useHeroRequests";

const Heroes = () => {
  const { fetchHeroes } = useHeroRequests();
  const { data, isSucess, isLoading, isError } = fetchHeroes;
  const location = useLocation();
  return <div>{location.state}</div>;
};

export default Heroes;
