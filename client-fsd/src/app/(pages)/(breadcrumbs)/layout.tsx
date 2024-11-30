import { Container } from '@/shared/ui';
import { Breadcrumbs } from '@/shared/components';

export default function BreadcrumbsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-[70px] pt-10 lg:pb-[140px] lg:pt-20">
      <Container>
        <Breadcrumbs />
      </Container>
      <div className="pt-10 lg:pt-20">{children}</div>
    </div>
  );
}
