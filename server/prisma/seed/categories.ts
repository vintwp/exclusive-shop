import { prisma } from "./prismaClient";
import { Category } from "@prisma/client";

type TinitialCategories = Array<Omit<Category, 'updatedAt' | 'createdAt' | 'refineOptionId'> & {
  refineOption: string[],
  additionalStores?: number[]
}>;

const defaultRefineOption = ['brand', 'stock'];

const initialCategories: TinitialCategories = [
  {
    id: 1,
    name: 'Mobile Phones',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/mobile-phones.svg',
    url: 'mobile-phones',
    additionalStores: [],
    refineOption: defaultRefineOption,
  },
  {
    id: 2,
    name: 'Notebooks',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/notebooks.svg',
    url: 'notebooks',
    additionalStores: [],
    refineOption: defaultRefineOption,
  },
  {
    id: 3,
    name: 'Car Bulbs',
    primaryStoreId: 2,
    displayOnMainPage: true,
    image: 'categories/bulbs.svg',
    url: 'bulbs',
    additionalStores: [],
    refineOption: defaultRefineOption,
  },
  {
    id: 4,
    name: 'Headphones',
    primaryStoreId: 1,
    displayOnMainPage: false,
    image: 'categories/headphones.svg',
    url: 'headphones',
    additionalStores: [],
    refineOption: defaultRefineOption,
  },
  {
    id: 5,
    name: 'Oils',
    primaryStoreId: 2,
    displayOnMainPage: true,
    image: 'categories/oil.svg',
    url: 'oils',
    additionalStores: [],
    refineOption: defaultRefineOption,
  },
  {
    id: 6,
    name: 'Security Systems',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/security-systems.svg',
    url: 'security-systems',
    additionalStores: [5],
    refineOption: defaultRefineOption,
  },
  {
    id: 7,
    name: 'TV',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/tv.svg',
    url: 'tv',
    additionalStores: [],
    refineOption: defaultRefineOption,
  },
  {
    id: 8,
    name: 'Smartwatches',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/smartwatches.svg',
    url: 'smartwatches',
    additionalStores: [],
    refineOption: defaultRefineOption,
  },
  {
    id: 9,
    name: 'Bycicles',
    primaryStoreId: 3,
    displayOnMainPage: true,
    image: 'categories/bycicle.svg',
    url: 'bycicle',
    additionalStores: [4],
    refineOption: defaultRefineOption,
  },
  {
    id: 10,
    name: 'Speakers',
    primaryStoreId: 1,
    displayOnMainPage: true,
    image: 'categories/speakers.svg',
    url: 'speakers',
    additionalStores: [],
    refineOption: defaultRefineOption,
  },
];

export async function createCategories() {
  await prisma.category.deleteMany({
    where: {
      additionalStores: {
        none: {},
      },
      brands: {
        none: {},
      },
      refineOption: {
        none: {},
      }
    }
  });

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
            initialCategories[0].additionalStores.map(v => {
              return {
                store: {
                  connect: {
                    id: v
                  }
                }
              }
            }),
        },
        // refineOption: {
        //   create: 
        //     defaultRefineOption.map(defRefOption => {
        //       return {
        //         option: {
        //           connectOrCreate: {
        //             where: {
        //               optionName: defRefOption,
        //             },
        //             create: {
        //               optionName: defRefOption,
        //             }
        //           }
        //         }
        //       }
        //     })
        // }
      }
    })
  }

  await prisma.$queryRaw`ALTER SEQUENCE category_category_id_seq RESTART WITH 10`
}