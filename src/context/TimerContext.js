import React, { createContext, useContext, useEffect, useState } from "react";
import { loadTimers, saveTimers } from "../storage/timerStorage.js";
import { v4 as uuidv4 } from "uuid";
import { getTodayDateString } from "../utils/dateUtils";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [activeTimerId, setActiveTimerId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  /* ===============================
     LOAD TIMERS ON APP START
  =============================== */
  useEffect(() => {
    const initialize = async () => {
      const storedTimers = await loadTimers();
      if (storedTimers) {
        setTimers(storedTimers);

        const runningTimer = storedTimers.find(t => t.isRunning);
        if (runningTimer) {
          setActiveTimerId(runningTimer.id);
        }
      }
      setIsLoaded(true);
    };

    initialize();
  }, []);

  /* ===============================
     PERSIST TIMERS ON CHANGE
  =============================== */
  useEffect(() => {
    if (isLoaded) {
      saveTimers(timers);
    }
  }, [timers, isLoaded]);

  /* ===============================
     ADD TIMER
  =============================== */
  const addTimer = (date, name) => {
    if (date !== getTodayDateString()) {
        console.warn("Cannot add timer to past or future date.");
        return;
    }

    const newTimer = {
        id: uuidv4(),
        date,
        name,
        totalDuration: 0,
        isRunning: false,
        startTime: null,
  };

    setTimers(prev => [...prev, newTimer]);
};
  /* ===============================
     START TIMER
  =============================== */
  const startTimer = (timerId) => {
    if (activeTimerId) {
      console.warn("Another timer is already running.");
      return false;
    }

    setTimers(prev =>
      prev.map(timer =>
        timer.id === timerId
          ? {
              ...timer,
              isRunning: true,
              startTime: Date.now(),
            }
          : timer
      )
    );

    setActiveTimerId(timerId);
    return true;
  };

  /* ===============================
     STOP TIMER
  =============================== */
  const stopTimer = (timerId) => {
    setTimers(prev =>
      prev.map(timer => {
        if (timer.id === timerId && timer.isRunning) {
          const elapsed = Date.now() - timer.startTime;

          return {
            ...timer,
            isRunning: false,
            startTime: null,
            totalDuration: timer.totalDuration + elapsed,
          };
        }
        return timer;
      })
    );

    setActiveTimerId(null);
  };

  /* ===============================
     GET TIMERS BY DATE
  =============================== */
  const getTimersByDate = (date) => {
    return timers.filter(timer => timer.date === date);
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        activeTimerId,
        addTimer,
        startTimer,
        stopTimer,
        getTimersByDate,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);