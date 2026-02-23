import { useEffect, useState } from "react";
import { calculateElapsed, formatDuration } from "../utils/timeUtils";

const useTimer = (timer) => {
  const [displayTime, setDisplayTime] = useState(
    formatDuration(calculateElapsed(timer))
  );

  useEffect(() => {
    let interval;

    if (timer.isRunning) {
      interval = setInterval(() => {
        const elapsed = calculateElapsed(timer);
        setDisplayTime(formatDuration(elapsed));
      }, 1000);
    } else {
      setDisplayTime(formatDuration(calculateElapsed(timer)));
    }

    return () => clearInterval(interval);
  }, [timer]);

  return displayTime;
};

export default useTimer;