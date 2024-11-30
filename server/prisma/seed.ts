import { Category, PrismaClient, Store } from "@prisma/client";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Vitaliy',
    lastName: 'Pa',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'ADMIN',
    oauthId: null,
    adress: null
  },
  {
    id: 2,
    name: 'Antonio',
    lastName: 'Banderas',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'user@gmail.com',
    password: 'user',
    role: 'USER',
    oauthId: null,
    adress: null
  }
];

const initialStores: Store[] = [
  {
    id: 1,
    name: 'Electronics',
    url: 'electronics',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Automotive',
    url: 'automotive',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Sports & Outdoor',
    url: 'sports-outdoor',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: 'Babies & Toys',
    url: 'babies-toys',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: 'Home & Lifestyle',
    url: 'home-lifestyle',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const initialCategories: Array<Category & { additionalStores?: number[] }> = [
  {
    id: 1,
    name: 'Mobile Phones',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/mobile-phones.svg',
    url: 'mobile-phones',
    createdAt: new Date(),
    updatedAt: new Date(),
    additionalStores: [],
  },
  {
    id: 2,
    name: 'Notebooks',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/notebooks.svg',
    url: 'notebooks',
    createdAt: new Date(),
    updatedAt: new Date(),
    additionalStores: [],
  },
  {
    id: 3,
    name: 'Car Bulbs',
    primaryStoreId: 2,
    displayOnMainPage: true,
    image: 'categories/bulbs.svg',
    url: 'bulbs',
    createdAt: new Date(),
    updatedAt: new Date(),
    additionalStores: [],
  },
  {
    id: 4,
    name: 'Headphones',
    primaryStoreId: 1,
    displayOnMainPage: false,
    image: 'categories/headphones.svg',
    url: 'headphones',
    createdAt: new Date(),
    updatedAt: new Date(),
    additionalStores: [],
  },
  {
    id: 5,
    name: 'Oils',
    primaryStoreId: 2,
    displayOnMainPage: true,
    image: 'categories/oil.svg',
    url: 'mobile-phones',
    createdAt: new Date(),
    updatedAt: new Date(),
    additionalStores: [],
  },
  {
    id: 6,
    name: 'Security Systems',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/security-systems.svg',
    url: 'security-systems',
    createdAt: new Date(),
    updatedAt: new Date(),
    additionalStores: [5],
  },
  {
    id: 7,
    name: 'TV',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/tv.svg',
    url: 'tv',
    createdAt: new Date(),
    updatedAt: new Date(),
    additionalStores: [],
  },
  {
    id: 8,
    name: 'Smartwatches',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/smartwatches.svg',
    url: 'smartwatches',
    createdAt: new Date(),
    updatedAt: new Date(),
    additionalStores: [],
  },
  {
    id: 9,
    name: 'Bycicles',
    primaryStoreId: 3,
    displayOnMainPage: true,
    image: 'categories/bycicle.svg',
    url: 'bycicle',
    createdAt: new Date(),
    updatedAt: new Date(),
    additionalStores: [4],
  },
];

const seed = async () => {

  // clear data tables

  await prisma.user.deleteMany();

  await prisma.store.deleteMany({
    where: {
      additionalCategories: {
        none: {}
      }
    }
  });

  await prisma.category.deleteMany({
    where: {
      additionalStores: {
        none: {}
      }
    }
  });

  // creating users
  await prisma.user.createMany({
    data: initialUsers,
  });

  // creating global stores
  await prisma.store.createMany({
    data: initialStores
  });

  // creating categories
  for (const cat of initialCategories) {
    await prisma.category.create({
      data: {
        id: cat.id,
        name: cat.name,
        primaryStoreId: cat.primaryStoreId,
        displayOnMainPage: cat.displayOnMainPage,
        image: cat.image,
        url: cat.url,
        createdAt: cat.createdAt,
        updatedAt: cat.updatedAt,
        additionalStores: {
          create:
            cat.additionalStores.map(v => {
              return {
                store: {
                  connect: {
                    id: v
                  }
                }
              }
            }),
        }
      }
    })
  }

}

seed();