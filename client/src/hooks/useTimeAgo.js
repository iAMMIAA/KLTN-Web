import { useState, useEffect } from 'react';

export function useTimeAgo(date) {
  const [timeAgo, setTimeAgo] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const interval = setInterval(() => setNewTime(), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setNewTime = () => {
    const startTime = new Date(date);

    const endTime = new Date();

    const distanceToNow = endTime.valueOf() - startTime.valueOf();

    const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));

    const getHours = Math.floor(
      (distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const getMinutes = Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60));

    const getSeconds = Math.floor((distanceToNow % (1000 * 60)) / 1000);

    setTimeAgo({
      days: getDays,
      hours: getHours,
      minutes: getMinutes,
      seconds: getSeconds,
    });
  };

  return {
    days: timeAgo.days,
    hours: timeAgo.hours,
    minutes: timeAgo.minutes,
    seconds: timeAgo.seconds,
  };
}
