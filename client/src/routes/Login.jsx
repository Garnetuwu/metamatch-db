import { useRef } from "react";

import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

import useCountdown from "../hooks/useCountdown";
import useAuthRequests from "../hooks/useAuthRequests";
import { useAuth } from "../store/auth-context";
import DisplayWrapper from "../components/display/DisplayWrapper";

const Login = () => {
  const { login } = useAuthRequests();
  const { loggedIn } = useAuth();

  const emailRef = useRef();
  const {
    triggerTimerState: sentEmail,
    setTriggerTimerState: setSentEmail,
    timeRemaining,
  } = useCountdown(5);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    login.mutate(emailRef.current.value);
    setSentEmail(true);
  };

  return (
    <DisplayWrapper>
      {loggedIn && <p> You are already logged in</p>}
      {!loggedIn && (
        <Card className="border-[2px] border-sand w-[30rem]">
          <p className="text-[2.5rem] text-center p-5"> Login </p>
          <form
            action="/"
            onSubmit={formSubmitHandler}
            className="px-5 pb-5 grid grid-col-[auto,1fr]"
          >
            <label
              htmlFor="email"
              className="pr-5 font-bold whitespace-nowrap text-md"
            >
              Email Address:
            </label>
            <Input
              type="email"
              id="email"
              pattern="\S*"
              required
              ref={emailRef}
            />
            <p className=" text-dirty-pink text-[1.1rem] text-semibold whitespace-pre-wrap">
              {login.isSuccess &&
                "*Please check your email to complete logging in"}
              {login.isError &&
                `*Something went wrong, please try again later *${login.error.message}`}
            </p>
            <Button
              disabled={login.isLoading || sentEmail}
              className="border-[1px] border-sand disabled:bg-onyx my-3 py-2"
              type="submit"
            >
              {!sentEmail && timeRemaining == null && "send verification email"}
              {sentEmail &&
                timeRemaining > 0 &&
                `resend email in ${timeRemaining}s`}
              {!sentEmail && timeRemaining === 0 && "resend email now"}
            </Button>
          </form>
        </Card>
      )}
    </DisplayWrapper>
  );
};

export default Login;
