import { prisma } from "./prismaClient";
import { Banner } from "@prisma/client";

type TBanner = Array<Omit<Banner, 'id' | 'updatedAt' | 'createdAt'>>;

const initialBanner: TBanner = [
  {
    url: 'oils',
    image: 'banner/banner-1.webp',
  },
  {
    url: 'notebooks',
    image: 'banner/banner-2.webp',
  },
  {
    url: 'tv',
    image: 'banner/banner-3.webp',
  },
  {
    url: 'smartwatches',
    image: 'banner/banner-4.webp',
  },
];

export async function createBanner() {
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