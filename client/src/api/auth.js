import axios from "axios";

export const loginUser = async (email) => {
  console.log(email);
  await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, { email });
};

export const authUser = async (token) => {
  axios.defaults.headers.common["Authorization"] = `BEARER ${token}`;
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/authenticate`
  );
  return res;
};
