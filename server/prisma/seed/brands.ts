import { prisma } from "./prismaClient";
import { Brand } from "@prisma/client";

type TinitialBrands = Array<Omit<Brand, 'updatedAt' | 'createdAt'> & { categories: number[] }>;

const initialBrands: TinitialBrands = [
  {
    id: 1,
    name: 'Ajax',
    url: 'ajax',
    image: 'brands/ajax.png',
    categories: [6]
  },
  {
    id: 2,
    name: 'Apple',
    url: 'apple',
    image: 'brands/apple.png',
    categories: [1, 2, 4, 8]
  },
  {
    id: 3,
    name: 'Garmin',
    url: 'garmin',
    image: 'brands/garmin.png',
    categories: [6]
  },
  {
    id: 5,
    name: 'Giant',
    url: 'giant',
    image: 'brands/giant.png',
    categories: [9]
  },
  {
    id: 6,
    name: 'LG',
    url: 'lg',
    image: 'brands/lg.png',
    categories: [1, 2, 7]
  },
  {
    id: 7,
    name: 'Motul',
    url: 'motul',
    image: 'brands/motul.png',
    categories: [5]
  },
  {
    id: 8,
    name: 'Philips',
    url: 'philips',
    image: 'brands/philips.png',
    categories: [3, 4, 7]
  },
  {
    id: 9,
    name: 'Samsung',
    url: 'samsung',
    image: 'brands/samsung.png',
    categories: [1, 2, 4, 7, 8]
  },
  {
    id: 10,
    name: 'Total',
    url: 'total',
    image: 'brands/total.png',
    categories: [5]
  },
  {
    id: 11,
    name: 'Toyota',
    url: 'toyota',
    image: 'brands/toyota.png',
    categories: [5]
  },
  {
    id: 12,
    name: 'TREK',
    url: 'trek',
    image: 'brands/trek.png',
    categories: [9]
  },
  {
    id: 13,
    name: 'Xiaomi',
    url: 'xiaomi',
    image: 'brands/xiaomi.png',
    categories: [1, 2, 4, 7, 8]
  },
];

export async function createBrands() {
  await prisma.brand.deleteMany({
    where: {
      categories: {
        none: {}
      }
    }
  });

  for (const brand of initialBrands) {
    await prisma.brand.create({
      data: {
        id: brand.id,
        name: brand.name,
        url: brand.url,
        image: brand.image,
        categories: {
          create: 
            brand.categories.map(v => {
              return {
                category: {
                  connect: {
                    id: v,
                  }
                }
              }
            })
        }
      }
    })
  }

  await prisma.$queryRaw`ALTER SEQUENCE brand_brand_id_seq RESTART WITH 14`
};