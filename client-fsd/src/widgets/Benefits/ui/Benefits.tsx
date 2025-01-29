import React from 'react';
import { Truck, Headset, ShieldCheck } from 'lucide-react';
import { PageSection } from '@/shared/components';
import { Container } from '@/shared/ui';
import { BenefitItem } from './BenefitItem';

type Props = {};

export const Benefits: React.FC<Props> = () => {
  return (
    <Container>
      <PageSection>
        <div className="flex flex-wrap justify-around gap-8">
          <BenefitItem
            title="FREE AND FAST DELIVERY"
            text="Free delivery for all orders over $140"
            icon={
              <Truck
                width={30}
                height={30}
                className="text-white"
              />
            }
          />
          <BenefitItem
            title="24/7 CUSTOMER SERVICE"
            text="Friendly 24/7 customer support"
            icon={
              <Headset
                width={30}
                height={30}
                className="text-white"
              />
            }
          />
          <BenefitItem
            title="MONEY BACK GUARANTEE"
            text="We return money within 30 days"
            icon={
              <ShieldCheck
                width={30}
                height={30}
                className="text-white"
              />
            }
          />
        </div>
      </PageSection>
    </Container>
  );
};
