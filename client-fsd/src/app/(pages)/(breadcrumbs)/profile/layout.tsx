import { Container } from '@/shared/ui';
import { AccountSidebar } from '@/widgets';
import { ShadowedFrame } from '@/shared/components';

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Container>
        <div className="flex">
          <div className="w-1/4">
            <AccountSidebar />
          </div>
          <div className="w-3/4">
            <ShadowedFrame>{children}</ShadowedFrame>
          </div>
        </div>
      </Container>
    </div>
  );
}
