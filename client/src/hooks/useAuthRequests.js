import { useMutation } from "@tanstack/react-query";
import { authUser, loginUser } from "../api/auth";

const useAuthRequests = () => {
  const login = useMutation((email) => loginUser(email));
  const authenticate = useMutation((token) => authUser(token));

  return { login, authenticate };
};

export default useAuthRequests;
