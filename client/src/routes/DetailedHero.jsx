import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHeroRequests from "../hooks/useHeroRequests";

const DetailedHero = () => {
  const token = localStorage.getItem("token");
  const param = useParams();
  const { fetchHeroData } = useHeroRequests(param.id, token);
  const { isLoading, isSuccess, data, isError, error, refetch } = fetchHeroData;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log(data.data);
    }
  }, [data, isSuccess]);

  return <div>DetailedHero</div>;
};

export default DetailedHero;
