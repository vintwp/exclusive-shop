'use client';

import React from 'react';
import { Circle } from 'lucide-react';
import { useTimer } from '@/features/Timer';

type TimerDataProps = {
  title: string;
  value: string;
};

const TimerData: React.FC<TimerDataProps> = ({ title, value }) => {
  return (
    <div>
      <p className="mb-1 text-xxs font-medium md:text-xs">{title}</p>
      <p className="text-lg leading-none tracking-wider md:text-[32px]">
        {value}
      </p>
    </div>
  );
};

const TimerDivider: React.FC = () => {
  return (
    <div className="translate-y-2">
      <Circle
        width={4}
        height={4}
        className="mb-2 block fill-clr-secondary-3 stroke-clr-secondary-3"
      />
      <Circle
        width={4}
        height={4}
        className="block fill-clr-secondary-3 stroke-clr-secondary-3"
      />
    </div>
  );
};

type Props = {
  timerEnds: string;
};

export const Timer: React.FC<Props> = ({ timerEnds }) => {
  const { days, hours, minutes, seconds } = useTimer(timerEnds);

  return (
    <div className="lg:leading-0 flex items-center gap-2 sm:gap-4 lg:ml-24">
      <TimerData
        title="Days"
        value={days}
      />
      <TimerDivider />
      <TimerData
        title="Hours"
        value={hours}
      />
      <TimerDivider />
      <TimerData
        title="Minutes"
        value={minutes}
      />
      <TimerDivider />
      <TimerData
        title="Seconds"
        value={seconds}
      />
    </div>
  );
};
