import React from 'react';
import Image from 'next/image';
import { Container } from '@/shared/ui';

type Props = {};

export const AboutHero: React.FC<Props> = () => {
  return (
    <Container
      type="fluid"
      align="left"
      className="flex items-center gap-[75px]"
    >
      <div className="max-w-[525px] flex-1 md:basis-full">
        <h1 className="mb-5 text-3xl font-semibold leading-tight tracking-wider md:mb-10 md:text-6xl">
          Our Story
        </h1>
        <p className="mb-4 leading-[1.62] md:mb-6">
          Launced in 2015, Exclusive is South Asia’s premier online shopping
          makterplace with an active presense in Bangladesh. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sallers and 300 brands and serves 3 millioons customers across
          the region.
        </p>
        <p className="leading-[1.62]">
          Exclusive has more than 1 Million products to offer, growing at a very
          fast. Exclusive offers a diverse assotment in categories ranging from
          consumer.
        </p>
      </div>
      <div className="hidden max-h-[609px] flex-1 md:block">
        <div className='relative pb-[70%] after:block after:content-[""]'>
          <Image
            src="/about/about-photo.webp"
            alt="Exclusive About Image"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </Container>
  );
};
