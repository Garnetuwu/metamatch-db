import Card from "../components/UI/Card";
import HeroBasicInfo from "../components/HeroForm/HeroBasicInfo";
import { useDispatch } from "react-redux";
import useHeroRequests from "../hooks/useHeroRequests";
import { useEffect } from "react";

const NewHero = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { postNewHero } = useHeroRequests();
  const { isError, isLoading, error } = postNewHero;

  useEffect(() => {
    dispatch({ type: "CLEAR_HERO" });
  }, []);

  const formSubmitHandler = (newHero) => {
    postNewHero.mutate({ newHero, token });
  };

  return (
    <Card>
      <HeroBasicInfo
        title="New Hero"
        onSubmit={formSubmitHandler}
        isError={isError}
        isLoading={isLoading}
        error={error}
      />
    </Card>
  );
};

export default NewHero;
