'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { TimerDivider } from './TimerDivider';
import { TimerData } from './TimerData';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Props = {
  deadline?: string;
};

export const FlashSalesTimer: React.FC<Props> = ({
  deadline = new Date().toString(),
}) => {
  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
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

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <TimerData
        title="Days"
        value={Math.floor(time / DAY)
          .toString()
          .padStart(2, '0')}
      />
      <TimerDivider className="translate-y-2" />
      <TimerData
        title="Hours"
        value={(Math.floor(time / HOUR) % 24).toString().padStart(2, '0')}
      />
      <TimerDivider className="translate-y-2" />
      <TimerData
        title="Minutes"
        value={(Math.floor(time / MINUTE) % 60).toString().padStart(2, '0')}
      />
      <TimerDivider className="translate-y-2" />
      <TimerData
        title="Seconds"
        value={(Math.floor(time / SECOND) % 60).toString().padStart(2, '0')}
      />
    </div>
  );
};
