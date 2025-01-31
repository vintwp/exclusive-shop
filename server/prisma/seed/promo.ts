import { prisma } from "./prismaClient";
import { Banner, PromoCategory, PromoNewArrival } from "@prisma/client";

type TBanner = Array<Omit<Banner, 'id' | 'updatedAt' | 'createdAt'>>;

const initialBanner: TBanner = [
  {
    url: 'oils',
    image: 'promo/promo-banner/banner-1.webp',
  },
  {
    url: 'notebooks',
    image: 'promo/promo-banner/banner-2.webp',
  },
  {
    url: 'tv',
    image: 'promo/promo-banner/banner-3.webp',
  },
  {
    url: 'smartwatches',
    image: 'promo/promo-banner/banner-4.webp',
  },
];

export async function createPromoBanner() {
  await prisma.banner.deleteMany({
    where: {}
  });

  for (const banner of initialBanner) {
    await prisma.banner.create({
      data: {
        url: banner.url,
        image: banner.image,
      }
    })
  }

};

type TPromoCategory = Omit<PromoCategory, 'id' | 'updatedAt' | 'createdAt'> & {
  timerEnd: String;
};

const initialPromoCategory: TPromoCategory = {
  text: 'Enhance Your Music Experience',
  image: 'promo/promo-category/promo-category.webp',
  url: 'speakers',
  timerEnd: '2025-02-28',
}

export async function createPromoCategoryBanner() {
  const { text, image, url, timerEnd } = initialPromoCategory;

  await prisma.promoCategory.deleteMany({
    where: {}
  });

  await prisma.promoCategory.create({
    data: {
      text,
      image,
      url
    }
  });

  await prisma.timer.create({
    data: {
      timer: 'PROMO',
      'timerEnds': new Date('2025-02-28'),
    }
  });
  
}

type TPromoNewArrival = Array<Omit<PromoNewArrival, 'id' | 'updatedAt' | 'createdAt'>>;

const initialPromoNewArrival: TPromoNewArrival = [
  {
    title: 'PlayStation 5',
    text: 'Black and White version of the PS5 coming out on sale.',
    url: 'gaming',
    image: 'promo/promo-new-arrival/gaming.jpg',
  },
  {
    title: 'Engine Oils',
    text: 'Complete care for your engine',
    url: 'oils',
    image: 'promo/promo-new-arrival/oil.jpg',
  },
  {
    title: 'Gaming Laptops',
    text: 'Power Your Passion with Premium Gaming Laptops',
    url: 'notebooks',
    image: 'promo/promo-new-arrival/notebooks.jpeg',
  },
  {
    title: 'New OLED TV',
    text: 'Your Window to the World',
    url: 'tv',
    image: 'promo/promo-new-arrival/tv.jpg',
  },


]

export async function createPromoNewArrival() {
  await prisma.promoNewArrival.deleteMany({
    where: {}
  });

  for (const arrival of initialPromoNewArrival) {
    await prisma.promoNewArrival.create({
      data: {
        image: arrival.image,
        url: arrival.url,
        text: arrival.text,
        title: arrival.title,
      }
    })
  }
}