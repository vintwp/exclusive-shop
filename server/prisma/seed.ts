import { Category, PrismaClient, Store, Brand } from "@prisma/client";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

const initialUsers: Array<Omit<User, 'id' | 'updatedAt' | 'createdAt'>> = [
  {
    name: 'Vitaliy',
    lastName: 'Pa',
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'ADMIN',
    oauthId: null,
    adress: null
  },
  {
    name: 'Antonio',
    lastName: 'Banderas',
    email: 'user@gmail.com',
    password: 'user',
    role: 'USER',
    oauthId: null,
    adress: null
  }
];

const initialStores: Array<Omit<Store, 'id' | 'createdAt' | 'updatedAt'>> = [
  {
    name: 'Electronics',
    url: 'electronics',
  },
  {
    name: 'Automotive',
    url: 'automotive',
  },
  {
    name: 'Sports & Outdoor',
    url: 'sports-outdoor',
  },
  {
    name: 'Babies & Toys',
    url: 'babies-toys',
  },
  {
    name: 'Home & Lifestyle',
    url: 'home-lifestyle',
  },
];

const initialCategories: Array<Omit<Category, 'id' | 'createdAt' | 'updatedAt'> & { additionalStores?: number[] }> = [
  {
    name: 'Mobile Phones',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/mobile-phones.svg',
    url: 'mobile-phones',
    additionalStores: [],
  },
  {
    name: 'Notebooks',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/notebooks.svg',
    url: 'notebooks',
    additionalStores: [],
  },
  {
    name: 'Car Bulbs',
    primaryStoreId: 2,
    displayOnMainPage: true,
    image: 'categories/bulbs.svg',
    url: 'bulbs',
    additionalStores: [],
  },
  {
    name: 'Headphones',
    primaryStoreId: 1,
    displayOnMainPage: false,
    image: 'categories/headphones.svg',
    url: 'headphones',
    additionalStores: [],
  },
  {
    name: 'Oils',
    primaryStoreId: 2,
    displayOnMainPage: true,
    image: 'categories/oil.svg',
    url: 'mobile-phones',
    additionalStores: [],
  },
  {
    name: 'Security Systems',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/security-systems.svg',
    url: 'security-systems',
    additionalStores: [5],
  },
  {
    name: 'TV',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/tv.svg',
    url: 'tv',
    additionalStores: [],
  },
  {
    name: 'Smartwatches',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/smartwatches.svg',
    url: 'smartwatches',
    additionalStores: [],
  },
  {
    name: 'Bycicles',
    primaryStoreId: 3,
    displayOnMainPage: true,
    image: 'categories/bycicle.svg',
    url: 'bycicle',
    additionalStores: [4],
  },
];

const initialBrands: Array<Omit<Brand, 'id' | 'createdAt' | 'updatedAt'> & { storeId: number[], categoryId: number[] }> = [
  {
    name: 'Ajax',
    url: 'ajax',
    image: 'brands/ajax.png',
    storeId: [1, 5],
    categoryId: [6]
  },
  {
    name: 'Apple',
    url: 'apple',
    image: 'brands/apple.png',
    storeId: [1],
    categoryId: [1, 2, 4]
  },
  {
    name: 'Garmin',
    url: 'garmin',
    image: 'brands/garmin.png',
    storeId: [1],
    categoryId: [8]
  },
  {
    name: 'Giant',
    url: 'giant',
    image: 'brands/giant.png',
    storeId: [3],
    categoryId: [9]
  },
  {
    name: 'LG',
    url: 'lg',
    image: 'brands/lg.png',
    storeId: [1],
    categoryId: [9]
  },
  {
    name: 'Motul',
    url: 'motul',
    image: 'brands/lg.png',
    storeId: [2],
    categoryId: [5]
  },
  {
    name: 'Philips',
    url: 'philips',
    image: 'brands/philips.png',
    storeId: [1, 2],
    categoryId: [4, 3, 7]
  },
  {
    name: 'Samsung',
    url: 'samsung',
    image: 'brands/samsung.png',
    storeId: [1],
    categoryId: [1, 2, 4, 7, 8]
  },
  {
    name: 'Total',
    url: 'total',
    image: 'brands/total.png',
    storeId: [2],
    categoryId: [5]
  },
  {
    name: 'Toyota',
    url: 'toyota',
    image: 'brands/toyota.png',
    storeId: [2],
    categoryId: [5]
  },
  {
    name: 'Xiaomi',
    url: 'xiaomi',
    image: 'brands/xiaomi.png',
    storeId: [1, 5],
    categoryId: [1, 2, 4, 7, 8]
  },

]

// const initialBrands

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

  await prisma.brand.deleteMany({
    where: {
      stores: {
        none: {}
      },
      categories: {
        none: {}
      }
    }
  })

  // creating users
  for (const user of initialUsers) {
    await prisma.user.create({
      data: {
        ...user
      }
    })
  }

  // creating global stores
  for (const store of initialStores) {
    await prisma.store.create({
      data: {
        name: store.name,
        url: store.url
      }
    })
  }

  // creating categories
  for (const cat of initialCategories) {
    await prisma.category.create({
      data: {
        name: cat.name,
        primaryStoreId: cat.primaryStoreId,
        displayOnMainPage: cat.displayOnMainPage,
        image: cat.image,
        url: cat.url,
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
  };

  // creating brands

  for (const brand of initialBrands) {
    await prisma.brand.create({
      data: {
        name: brand.name,
        url: brand.url,
        image: brand.image,
        stores: {
          create:
            brand.storeId.map(v => {
              return {
                store: {
                  connect: {
                    id: v
                  }
                }
              }
            })
        },
        categories: {
          create:
            brand.categoryId.map(v => {
              return {
                category: {
                  connect: {
                    id: v
                  }
                }
              }
            })
        }
      }
    })
  };

}

seed();