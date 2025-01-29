'use client';

import { useEffect, useMemo, useState } from 'react';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type TimerData = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export function useTimer(timerEnds = new Date().toString()): TimerData {
  const parsedDeadline = useMemo(() => Date.parse(timerEnds), [timerEnds]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setTime(
          parsedDeadline - Date.now() < 0 ? 0 : parsedDeadline - Date.now(),
        ),
      1000,
    );

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    days: Math.floor(time / DAY)
      .toString()
      .padStart(2, '0'),
    hours: (Math.floor(time / HOUR) % 24).toString().padStart(2, '0'),
    minutes: (Math.floor(time / MINUTE) % 60).toString().padStart(2, '0'),
    seconds: (Math.floor(time / SECOND) % 60).toString().padStart(2, '0'),
  };
}
