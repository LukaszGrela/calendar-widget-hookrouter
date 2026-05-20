import { useState, useEffect } from 'react';
import { HOUR_MS, MINUTE_MS, SECOND_MS, startOfDay, add } from '../utils';

const getIntervalDelay = (diff: number) => {
  if (diff > 12 * HOUR_MS) {
    return 6 * HOUR_MS;
  } else if (diff > HOUR_MS) {
    return 30 * MINUTE_MS;
  } else if (diff > MINUTE_MS) {
    return 30 * SECOND_MS;
  }
  return 1000;
};
export const useToday = () => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const startOfTomorrow = startOfDay(add(today, 1, 'day'));
    const diff = startOfTomorrow.getTime() - today.getTime();

    const intervalId = setInterval(() => {
      setToday(new Date());
    }, getIntervalDelay(diff));

    return () => {
      clearInterval(intervalId);
    };
  }, [today]);

  return today;
};
