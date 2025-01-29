import React from 'react';

type Props = {
  title: string;
  value: string;
};

export const TimerData: React.FC<Props> = ({ title, value }) => {
  return (
    <div>
      <p className="mb-1 text-xxs font-medium sm:text-xs">{title}</p>
      <p className="text-lg leading-none tracking-wider sm:text-[32px]">
        {value}
      </p>
    </div>
  );
};
