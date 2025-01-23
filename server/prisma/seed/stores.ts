import { prisma } from "./prismaClient";
import { Store } from "@prisma/client";

type TinitialStores = Array<Omit<Store, 'updatedAt' | 'createdAt'>>;

const initialStores: TinitialStores = [
  {
    id: 1,
    name: 'Electronics',
    url: 'electronics',
  },
  {
    id: 2,
    name: 'Automotive',
    url: 'automotive',
  },
  {
    id: 3,
    name: 'Sports & Outdoor',
    url: 'sports-outdoor',
  },
  {
    id: 4,
    name: 'Babies & Toys',
    url: 'babies-toys',
  },
  {
    id: 5,
    name: 'Home & Lifestyle',
    url: 'home-lifestyle',
  },
];

export async function createStores() {
  await prisma.store.deleteMany({
    where: {
      additionalCategories: {
        none: {}
      }
    }
  });

  for (const store of initialStores) {
    await prisma.store.create({
      data: {
        id: store.id,
        name: store.name,
        url: store.url
      }
    })
  }

  await prisma.$queryRaw`ALTER SEQUENCE store_store_id_seq RESTART WITH 6`
}