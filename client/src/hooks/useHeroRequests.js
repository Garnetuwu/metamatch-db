import { addNewHero, getHeroes } from "../api/hero";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useHeroRequests = () => {
  const navigate = useNavigate();
  const postNewHero = useMutation({
    mutationFn: (data) => addNewHero(data.newHero, data.token),
    onSuccess: () => {
      navigate("/heroes", {
        replace: true,
        state: "hero successfully created",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const fetchHeroes = useQuery(["heroes"], {
    queryFn: getHeroes,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: "heroes" });
    },
  });

  return { postNewHero, fetchHeroes };
};

export default useHeroRequests;
