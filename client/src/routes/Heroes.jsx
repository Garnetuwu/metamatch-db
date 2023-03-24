import { Link, useLocation } from "react-router-dom";
import useHeroRequests from "../hooks/useHeroRequests";
import Card from "../components/UI/Card";
import HeroesList from "../components/Heroes/HeroesList";
import { useEffect } from "react";

const Heroes = () => {
  const { fetchHeroesData, deleteHeroMutation } = useHeroRequests();
  const { data, error, isSuccess, isLoading, isError, refetch } =
    fetchHeroesData;
  const { isSuccess: deleted, isError: deletedIsError } = deleteHeroMutation;
  const token = localStorage.getItem("token");
  const location = useLocation();
  const deleteHeroHandler = (id) => {
    deleteHeroMutation.mutate({ id, token });
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (deleted) {
      refetch();
    }
  }, [deleted]);

  return (
    <>
      {location.state !== "" && <div>{location.state}</div>}
      {isSuccess && data.length === 0 && (
        <Link to="/new-hero" className="underline underline-offset-4">
          No hero. Add your first hero
        </Link>
      )}
      {isLoading && <div>loading</div>}
      {isError && <div>{error.response}</div>}
      {isSuccess && data.length > 0 && (
        <Card className="grid xl:grid-cols-5 w-[90vw]">
          {isSuccess && data.length > 0 && (
            <HeroesList heroes={data} onDeleteHero={deleteHeroHandler} />
          )}
          {deletedIsError && <p>Something went wrong, try again</p>}
        </Card>
      )}
    </>
  );
};

export default Heroes;
