'use client';

import React from 'react';
import { useTimer } from '@/features/Timer';
import { cn } from '@/shared/lib';

type TimerDataProps = {
  title: string;
  value: string;
};

const TimerData: React.FC<TimerDataProps> = ({ title, value }) => {
  return (
    <div
      className="flex h-[52px] w-[52px] flex-col items-center justify-center rounded-full
        bg-white text-black sm:h-[62px] sm:w-[62px]"
    >
      <p className="font-semibold leading-tight">{value}</p>
      <p className="text-[11px] leading-[1.64]">{title}</p>
    </div>
  );
};

type Props = {
  timerEnds: string;
  className?: string;
};

export const PromoCategoryTimer: React.FC<Props> = ({
  timerEnds,
  className,
}) => {
  const { days, hours, minutes, seconds } = useTimer(timerEnds);

  return (
    <div
      className={cn(
        'flex [@media(max-width:360px)]:justify-between [@media(min-width:360px)]:gap-6',
        className,
      )}
    >
      <TimerData
        title="Days"
        value={days}
      />
      <TimerData
        title="Hours"
        value={hours}
      />
      <TimerData
        title="Minutes"
        value={minutes}
      />
      <TimerData
        title="Seconds"
        value={seconds}
      />
    </div>
  );
};
