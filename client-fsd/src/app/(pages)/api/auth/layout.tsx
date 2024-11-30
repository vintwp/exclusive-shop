import Image from 'next/image';
import { Container } from '@/shared/ui';
import Sideimage from '@/shared/assets/img/auth.jpg';

export default function LoginPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-16 pt-7 md:pb-36 md:pt-14">
      <Container className="w-full md:max-w-full md:p-0">
        <div className="flex gap-10">
          <div className="relative hidden w-7/12 md:block md:min-h-[600px]">
            <Image
              src={Sideimage}
              alt="Exclusive Login"
              fill
              className="object-cover"
              sizes="100%"
            />
          </div>
          <div
            className="flex w-full items-center md:mr-[calc((100vw-100%)/2+1rem)] md:w-4/12
              xl:mr-[calc((100%-1202px)/2+1rem)]"
          >
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}
