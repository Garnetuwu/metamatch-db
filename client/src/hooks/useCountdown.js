import { useEffect, useState } from "react";

const useCountdown = (timer, repeat = true) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [triggerTimerState, setTriggerTimerState] = useState(false);

  useEffect(() => {
    if (triggerTimerState) {
      setTimeRemaining(timer);
      const interval = setInterval(() => {
        setTimeRemaining((prevCounter) => prevCounter > 0 && prevCounter - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        if (repeat) {
          setTriggerTimerState(false);
        }
      }, timer * 1000);

      return () => clearInterval(interval);
    }
  }, [triggerTimerState]);

  return {
    triggerTimerState,
    setTriggerTimerState,
    timeRemaining,
  };
};

export default useCountdown;
