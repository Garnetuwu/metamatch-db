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

export const editHero = async (hero, token) => {
  axios.defaults.headers.common["Authorization"] = `BEARER ${token}`;
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/heroes/${hero.heroId}`,
    {
      hero,
    }
  );
  return res;
};

export const getHeroes = async () => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/heroes`);
  return res.data;
};

export const deleteHero = async (id, token) => {
  console.log(token, id);
  axios.defaults.headers.common["Authorization"] = `BEARER ${token}`;
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/heroes/${id}`
  );
  return res.data;
};

export const getHero = async (id, token) => {
  axios.defaults.headers.common["Authorization"] = `BEARER ${token}`;
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/heroes/${id}`
  );
  return res;
};
