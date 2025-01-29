import React from 'react';
import { Circle } from 'lucide-react';

type Props = {
  className?: string;
};

export const TimerDivider: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
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
