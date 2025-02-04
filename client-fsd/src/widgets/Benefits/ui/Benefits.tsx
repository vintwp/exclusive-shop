import React from 'react';
import { Truck, Headset, ShieldCheck } from 'lucide-react';
import { PageSection, BenefitCard } from '@/shared/components';
import { Container } from '@/shared/ui';

type Props = {};

export const Benefits: React.FC<Props> = () => {
  return (
    <Container>
      <PageSection>
        <div className="flex flex-wrap justify-around gap-8">
          <BenefitCard>
            <BenefitCard.Icon>
              <Truck
                width={30}
                height={30}
                className="text-white"
              />
            </BenefitCard.Icon>
            <BenefitCard.Title>FREE AND FAST DELIVERY</BenefitCard.Title>
            <BenefitCard.Text>
              Free delivery for all orders over $140
            </BenefitCard.Text>
          </BenefitCard>

          <BenefitCard>
            <BenefitCard.Icon>
              <Headset
                width={30}
                height={30}
                className="text-white"
              />
            </BenefitCard.Icon>
            <BenefitCard.Title>24/7 CUSTOMER SERVICE</BenefitCard.Title>
            <BenefitCard.Text>Friendly 24/7 customer support</BenefitCard.Text>
          </BenefitCard>

          <BenefitCard>
            <BenefitCard.Icon>
              <ShieldCheck
                width={30}
                height={30}
                className="text-white"
              />
            </BenefitCard.Icon>
            <BenefitCard.Title>MONEY BACK GUARANTEE</BenefitCard.Title>
            <BenefitCard.Text>We return money within 30 days</BenefitCard.Text>
          </BenefitCard>
        </div>
      </PageSection>
    </Container>
  );
};
