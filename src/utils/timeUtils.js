export const calculateElapsed = (timer) => {
  if (!timer.isRunning) {
    return timer.totalDuration;
  }

  return timer.totalDuration + (Date.now() - timer.startTime);
};

export const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};

export const calculateDaySummary = (timers) => {
  const summary = timers.map(timer => {
    const duration = timer.isRunning
      ? timer.totalDuration + (Date.now() - timer.startTime)
      : timer.totalDuration;

    return {
      id: timer.id,
      name: timer.name,
      duration,
    };
  });

  const total = summary.reduce((acc, curr) => acc + curr.duration, 0);

  return { summary, total };
};

export const isSameDate = (timestamp, dateString) => {
  const date = new Date(timestamp);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}` === dateString;
};