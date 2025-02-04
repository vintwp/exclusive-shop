import { Container } from '@/shared/ui';
import { AboutBenefits, AboutHero, Benefits, AboutCarts } from '@/widgets';
import { PageSection } from '@/shared/components';

export default function AboutPage() {
  return (
    <div className="-mt-10 lg:-mt-20">
      <PageSection>
        <AboutHero />
      </PageSection>
      <Container>
        <PageSection>
          <AboutBenefits />
        </PageSection>
        <PageSection>
          <AboutCarts />
        </PageSection>
        <div className="-mb-8 lg:-mb-16">
          <Benefits />
        </div>
      </Container>
    </div>
  );
}
