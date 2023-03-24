import {
  addNewHero,
  getHeroes,
  getHero,
  deleteHero,
  editHero,
} from "../api/hero";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useHeroRequests = (heroId, token) => {
  const queryClient = useQueryClient();
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

  const editHeroMutation = useMutation({
    mutationFn: (data) => editHero(data.hero, data.token),
  });

  const deleteHeroMutation = useMutation({
    mutationFn: (data) => deleteHero(data.id, data.token),
    onSettled: () => {
      console.log("hero successfully deleted");
      navigate("/heroes", { replace: true, state: "hero sucessfully deleted" });
    },
  });

  const fetchHeroesData = useQuery(["heroes"], {
    queryFn: getHeroes,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ["data"],
    enabled: false,
  });

  const fetchHeroData = useQuery(["heroes", heroId], {
    queryFn: () => getHero(heroId, token),
    enabled: false,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ["data"],
  });

  return {
    postNewHero,
    fetchHeroesData,
    deleteHeroMutation,
    fetchHeroData,
    editHeroMutation,
  };
};

export default useHeroRequests;
