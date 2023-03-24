import { useEffect } from "react";
import useQueryString from "../hooks/useQueryString";
import { Link, Navigate } from "react-router-dom";
import useCountdown from "../hooks/useCountdown";
import { useAuth } from "../store/auth-context";
import useAuthRequests from "../hooks/useAuthRequests";

const Verify = () => {
  const { timeRemaining, setTriggerTimerState } = useCountdown(3, false);
  const query = useQueryString();
  const token = query.get("token");
  const { loginHandler } = useAuth();
  const { authenticate } = useAuthRequests();
  const { data, isLoading, isSuccess, isError, error } = authenticate;

  if (!token) {
    return (
      <div className="text-center">
        <div> Please login with your email first </div>
        <Link to="/login" className="underline">
          go back to login page
        </Link>
      </div>
    );
  }

  useEffect(() => {
    if (token) {
      authenticate.mutate(token);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setTriggerTimerState(true);
      loginHandler(data.data);
    }
  }, [isSuccess, loginHandler]);

  return (
    <>
      <span />
      <div className="min-w-[20rem] min-h-[10rem] bg-sand rounded-md flex justify-center items-center text-metal font-semibold">
        {isLoading && <div>Authenticating...</div>}
        {isError && <div> {error.response.data} </div>}
        {isSuccess && (
          <div>
            <p>Welcome back, {data.data.user.username} </p>
            <p>Redirecting...{timeRemaining} </p>
            {timeRemaining === 0 && <Navigate to="/new-hero" />}
            <Link to="/heroes" className="block underline text-onyx">
              view heroes
            </Link>
          </div>
        )}
      </div>
      <span />
    </>
  );
};

export default Verify;
