import { Category, PrismaClient, Store, Brand } from "@prisma/client";
import { User } from "@prisma/client";
import { hashPassword } from "../lib";

const prisma = new PrismaClient();

type TInitialUsers = Array<Omit<User, 'id' | 'updatedAt' | 'createdAt'>>;
type TinitialStores = Array<Omit<Store, 'updatedAt' | 'createdAt'>>;
type TinitialCategories = Array<Omit<Category, 'updatedAt' | 'createdAt'> & { additionalStores?: number[]}>;
type TinitialBrands = Array<Omit<Brand, 'updatedAt' | 'createdAt'> & { categories: number[]}>;


const initialUsers: TInitialUsers = [
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

const initialCategories: TinitialCategories = [
  {
    id: 1,
    name: 'Mobile Phones',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/mobile-phones.svg',
    url: 'mobile-phones',
    additionalStores: [],
  },
  {
    id: 2,
    name: 'Notebooks',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/notebooks.svg',
    url: 'notebooks',
    additionalStores: [],
  },
  {
    id: 3,
    name: 'Car Bulbs',
    primaryStoreId: 2,
    displayOnMainPage: true,
    image: 'categories/bulbs.svg',
    url: 'bulbs',
    additionalStores: [],
  },
  {
    id: 4,
    name: 'Headphones',
    primaryStoreId: 1,
    displayOnMainPage: false,
    image: 'categories/headphones.svg',
    url: 'headphones',
    additionalStores: [],
  },
  {
    id: 5,
    name: 'Oils',
    primaryStoreId: 2,
    displayOnMainPage: true,
    image: 'categories/oil.svg',
    url: 'oils',
    additionalStores: [],
  },
  {
    id: 6,
    name: 'Security Systems',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/security-systems.svg',
    url: 'security-systems',
    additionalStores: [5],
  },
  {
    id: 7,
    name: 'TV',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/tv.svg',
    url: 'tv',
    additionalStores: [],
  },
  {
    id: 8,
    name: 'Smartwatches',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/smartwatches.svg',
    url: 'smartwatches',
    additionalStores: [],
  },
  {
    id: 9,
    name: 'Bycicles',
    primaryStoreId: 3,
    displayOnMainPage: true,
    image: 'categories/bycicle.svg',
    url: 'bycicle',
    additionalStores: [4],
  },
];

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
]

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
      categories: {
        none: {}
      }
    }
  });

  // await prisma.brand.deleteMany({
  //   where: {
  //     stores: {
  //       none: {}
  //     },
  //     categories: {
  //       none: {}
  //     }
  //   }
  // })

  // creating users
  for (const user of initialUsers) {
    const hashedPassword = await hashPassword(user.password);

    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      }
    })
  }

  // creating global stores
  for (const store of initialStores) {
    await prisma.store.create({
      data: {
        id: store.id,
        name: store.name,
        url: store.url
      }
    })
  }

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



  // for (const brand of initialBrands) {
  //   await prisma.brand.create({
  //     data: {
  //       name: brand.name,
  //       url: brand.url,
  //       image: brand.image,
  //       stores: {
  //         create:
  //           brand.storeId.map(v => {
  //             return {
  //               store: {
  //                 connect: {
  //                   id: v
  //                 }
  //               }
  //             }
  //           })
  //       },
  //       categories: {
  //         create:
  //           brand.categoryId.map(v => {
  //             return {
  //               category: {
  //                 connect: {
  //                   id: v
  //                 }
  //               }
  //             }
  //           })
  //       }
  //     }
  //   })
  // };

}

seed();