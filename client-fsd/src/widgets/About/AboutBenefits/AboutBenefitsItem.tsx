import React from 'react';
import { BenefitCard } from '@/shared/components';
import { cn } from '@/shared/lib';

type Props = {
  icon: React.ReactElement;
  title: string;
  text: string;
};

export const AboutBenefitsCard: React.FC<Props> = ({ icon, title, text }) => {
  return (
    <BenefitCard
      className={cn(
        'group max-w-[270px] rounded-sm border-[1px] border-black/20 p-[30px]',
        'hover:border-clr-button-hov hover:bg-clr-button-hov',
        'w-full',
      )}
    >
      <BenefitCard.Icon className="text-white group-hover:text-black group-hover:after:bg-white">
        {icon}
      </BenefitCard.Icon>
      <BenefitCard.Title className="group-hover:text-white">
        {title}
      </BenefitCard.Title>
      <BenefitCard.Text className="group-hover:text-white">
        {text}
      </BenefitCard.Text>
    </BenefitCard>
  );
};
