import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import HeroBasicInfo from "../components/HeroForm/HeroBasicInfo";
import Title from "../components/HeroForm/Title";
import { useSelector } from "react-redux";
import { strength, weakness } from "../utils/heroTraits";
import useHeroRequests from "../hooks/useHeroRequests";
import { useState, useEffect } from "react";

const NewHero = () => {
  const token = localStorage.getItem("token");
  const { postNewHero } = useHeroRequests();
  const { isError, isLoading, error } = postNewHero;

  const name = useSelector((state) => state.name);
  const role = useSelector((state) => state.role);
  const type = useSelector((state) => state.type);
  const image = useSelector((state) => state.image);
  const weakness = useSelector((state) => state.weakness);
  const strength = useSelector((state) => state.strength);

  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    if (
      name &&
      image &&
      role &&
      type &&
      weakness.length > 0 &&
      strength.length > 0
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [name, image, role, type, weakness, strength]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newHero = {
      name,
      image,
      role,
      type,
      weakness,
      strength,
    };
    postNewHero.mutate({ newHero, token });
  };

  return (
    <Card>
      <form action="/" onSubmit={formSubmitHandler} className="m-3">
        <Title>New Hero</Title>

        <HeroBasicInfo />

        <div className="w-1/3 m-auto">
          <Button
            className="py-2 mt-1 disabled:bg-gray-700"
            type="submit"
            disabled={!validForm || isLoading}
          >
            Submit
          </Button>
          {isError && (
            <p className="text-dirty-pink font-semibold">
              {error.response.data}
            </p>
          )}
        </div>
      </form>
    </Card>
  );
};

export default NewHero;
