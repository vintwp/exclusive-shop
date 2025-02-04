import React from 'react';
import { BaggageClaim, Briefcase, CircleDollarSign, Store } from 'lucide-react';
import { AboutBenefitsCard } from './AboutBenefitsItem';

type Props = {};

export const AboutBenefits: React.FC<Props> = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:justify-between">
      <AboutBenefitsCard
        title="10.5k"
        text="Sellers active our site"
        icon={
          <Store
            width={30}
            height={30}
            className="text-inherit"
          />
        }
      />
      <AboutBenefitsCard
        title="33k"
        text="Monthly Produduct Sale"
        icon={
          <CircleDollarSign
            width={30}
            height={30}
            className="text-inherit"
          />
        }
      />
      <AboutBenefitsCard
        title="45.5k"
        text="Customer active in our site"
        icon={
          <Briefcase
            width={30}
            height={30}
            className="text-inherit"
          />
        }
      />
      <AboutBenefitsCard
        title="25k"
        text="Anual gross sale in our site"
        icon={
          <BaggageClaim
            width={30}
            height={30}
            className="text-inherit"
          />
        }
      />
    </div>
  );
};
