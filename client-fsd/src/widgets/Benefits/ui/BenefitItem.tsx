import { cn } from '@/shared/lib';
import React from 'react';

type Props = {
  title: string;
  text: string;
  icon: React.ReactElement;
};

// https://medium.com/@pkuzmanovski/importing-an-svg-using-next-js-14-5bf144030027

export const BenefitItem: React.FC<Props> = ({ title, text, icon }) => {
  return (
    <div>
      <div
        className={cn(
          'relative h-20 w-20 rounded-full bg-clr-secondary-2',
          'mx-auto mb-3 sm:mb-6',
          `after:absolute after:left-1/2 after:top-1/2 after:h-[60px] after:w-[60px]
          after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-black
          after:content-[""]`,
        )}
      >
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          {icon}
        </div>
      </div>
      <p className="mb-2 text-center text-base font-semibold uppercase leading-[1.4] sm:text-xl">
        {title}
      </p>
      <p className="text-center text-xs leading-normal sm:text-sm">{text}</p>
    </div>
  );
};
