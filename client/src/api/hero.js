import axios from "axios";

export const addNewHero = async (newHero, token) => {
  axios.defaults.headers.common["Authorization"] = `BEARER ${token}`;
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/heroes/new-hero`,
    {
      newHero,
    }
  );
  return res;
};

export const getHeroes = async () => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/heroes`);
  return res.data;
};
