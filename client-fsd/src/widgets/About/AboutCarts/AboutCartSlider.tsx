import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/shared/ui';
import { AboutCart } from './AboutCart';

type Props = {};

const cards = [
  {
    image: '/about/antony-hopkins.webp',
    name: 'Anthony Hopkins',
    position: 'Founder & Chairman',
    twitter: 'https://www.twitter.com/antony-hopkins',
    instagramm: 'https://www.instagramm.com/antony-hopkins',
    linkedin: 'https://www.linkedin.com/antony-hopkins',
  },
  {
    image: '/about/sylvester-stallone.webp',
    name: 'Sylvester Stallone',
    position: 'Co-Founder & CEO',
    twitter: 'https://www.twitter.com/sylvester-stallone',
    instagramm: 'https://www.instagramm.com/sylvester-stallone',
    linkedin: 'https://www.linkedin.com/sylvester-stallone',
  },
  {
    image: '/about/charlize-theron.webp',
    name: 'Charlize Theron',
    position: 'General Manager',
    twitter: 'https://www.twitter.com/charlize-theron',
    instagramm: 'https://www.instagramm.com/charlize-theron',
    linkedin: 'https://www.linkedin.com/charlize-theron',
  },
  {
    image: '/about/wesley-snipes.webp',
    name: 'Wesley Snipes',
    position: 'Financial Manager',
    twitter: 'https://www.twitter.com/wesley-snipes',
    instagramm: 'https://www.instagramm.com/wesley-snipes',
    linkedin: 'https://www.linkedin.com/wesley-snipes',
  },
  {
    image: '/about/dwayne-johnson.webp',
    name: 'Dwayne Johnson',
    position: 'Product Developer',
    twitter: 'https://www.twitter.com/dwayne-johnson',
    instagramm: 'https://www.instagramm.com/dwayne-johnson',
    linkedin: 'https://www.linkedin.com/dwayne-johnson',
  },
  {
    image: '/about/tom-cruise.webp',
    name: 'Tom Cruise',
    position: 'Marketing Manager',
    twitter: 'https://www.twitter.com/tom-cruise',
    instagramm: 'https://www.instagramm.com/tom-cruise',
    linkedin: 'https://www.linkedin.com/tom-cruise',
  },
  {
    image: '/about/jackie-chan.webp',
    name: 'Jackie Chan',
    position: 'Operation Manager',
    twitter: 'https://www.twitter.com/jackie-chan',
    instagramm: 'https://www.instagramm.com/jackie-chan',
    linkedin: 'https://www.linkedin.com/jackie-chan',
  },
];

export const AboutCartSlider: React.FC<Props> = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {cards.map(card => (
          <CarouselItem
            key={card.name}
            className="basis-full md:basis-1/2 lg:basis-1/3"
          >
            <AboutCart
              image={card.image}
              name={card.name}
              position={card.position}
              twitter={card.twitter}
              instagramm={card.instagramm}
              linkedin={card.linkedin}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:-bottom-10" />
    </Carousel>
  );
};
