import { User } from "@prisma/client";
import { Item, ItemGroup, ItemImage } from "@prisma/client";
import { prisma } from "./prismaClient";

type TInitialItems = Array<Omit<Item, 'updatedAt' | 'createdAt' | 'itemGroupId'>  & { itemGroupName: string }>;
type TInitialItemGroups = Array<Omit<ItemGroup, 'updatedAt' | 'createdAt'>>;
type TInitialItemImages = Array<{images: string[]}>;

type initialItemsTest = {
  id: number;
  name: string;
  url: string;
  brandId: number;
  categoryId: number;
  storeId: number;
  price: number;
  priceDiscount: number;
  ourItem: boolean;
  itemGroupName: string;
  itemImages?: string[];
  stockQty?: number;
  forSale?: boolean;
  bestSeller?: boolean;
}

const intialItemGroups: TInitialItemGroups = [
  {
    id: 1,
    name: 'apple-iphone-16-pro-max',
    optionKeys: ['color', 'storage'],
  }
];


const initialItemImages: TInitialItemImages = [
  {
    images: [
      'items/mobile-phones/apple-iphone-16-pro-max-black-titanium.jpg',
      'items/mobile-phones/apple-iphone-16-pro-max-black-titanium-2.jpg',
      'items/mobile-phones/apple-iphone-16-pro-max-black-titanium-3.jpg',
      'items/mobile-phones/apple-iphone-16-pro-max-black-titanium-4.jpg'
    ],
  },
  {
    images: [
      'items/mobile-phones/apple-iphone-16-pro-max-desert-titanium.jpg',
      'items/mobile-phones/apple-iphone-16-pro-max-desert-titanium-2.jpg',
      'items/mobile-phones/apple-iphone-16-pro-max-desert-titanium-3.jpg',
      'items/mobile-phones/apple-iphone-16-pro-max-desert-titanium-4.jpg'
    ],
  },
  {
    images: [
      'items/mobile-phones/apple-iphone-16-pro-max-natural-titanium.jpg',
      'items/mobile-phones/apple-iphone-16-pro-max-natural-titanium-2.jpg',
      'items/mobile-phones/apple-iphone-16-pro-max-natural-titanium-3.jpg',
      'items/mobile-phones/apple-iphone-16-pro-max-natural-titanium-4.jpg'
    ],
  },
  {
    images: [
      'items/mobile-phones/apple-iphone-16-pro-white-titanium.jpg',
      'items/mobile-phones/apple-iphone-16-pro-white-titanium-2.jpg',
      'items/mobile-phones/apple-iphone-16-pro-white-titanium-3.jpg',
      'items/mobile-phones/apple-iphone-16-pro-white-titanium-4.jpg'
    ],
  }
];

const initialItems: initialItemsTest[] = [
  {
    id: 1,
    name: 'Apple Iphone 16 Pro Max 256Gb Black Titanium',
    url: 'apple-iphone-16-pro-max-256gb-black-titanium',
    brandId: 2,
    categoryId: 1,
    storeId: 1,
    price: 1199,
    priceDiscount: 1199,
    ourItem: false,
    itemGroupName: 'apple-iphone-16-pro-max',
    stockQty: 8,
    bestSeller: false,
    forSale: true,
    itemImages: initialItemImages[0].images,
  },
  {
    id: 2,
    name: 'Apple Iphone 16 Pro Max 512Gb Desert Titanium',
    url: 'apple-iphone-16-pro-max-512gb-desert-titanium',
    brandId: 2,
    categoryId: 1,
    storeId: 1,
    price: 1399,
    priceDiscount: 1299,
    ourItem: false,
    itemGroupName: 'apple-iphone-16-pro-max',
    stockQty: 2,
    bestSeller: true,
    forSale: false,
    itemImages: initialItemImages[1].images,
  },
  {
    id: 3,
    name: 'Apple Iphone 16 Pro Max 1Tb Natural Titanium',
    url: 'apple-iphone-16-pro-max-1tb-natural-titanium',
    brandId: 2,
    categoryId: 1,
    storeId: 1,
    price: 1699,
    priceDiscount: 1699,
    ourItem: false,
    itemGroupName: 'apple-iphone-16-pro-max',
    stockQty: 5,
    bestSeller: true,
    forSale: false,
    itemImages: initialItemImages[2].images,
  },
  {
    id: 4,
    name: 'Apple Iphone 16 Pro Max 1Tb White Titanium',
    url: 'apple-iphone-16-pro-max-1tb-white-titanium',
    brandId: 2,
    categoryId: 1,
    storeId: 1,
    price: 1599,
    priceDiscount: 1599,
    ourItem: false,
    itemGroupName: 'apple-iphone-16-pro-max',
    stockQty: 5,
    bestSeller: false,
    forSale: false,
    itemImages: initialItemImages[3].images,
  },

];

export async function createItems() {
  await prisma.itemGroup.deleteMany({
    where: {
      items: {
        none: {},
      }
    }
  });

  await prisma.itemImage.deleteMany();

  // await prisma.item.create({
  //   data: {
  //     name: initialItems[0].name,
  //     url: initialItems[0].url,
  //     price: initialItems[0].price,
  //     priceDiscount: initialItems[0].priceDiscount,
  //     category: {
  //       connect: {
  //         id: initialItems[0].categoryId,
  //       }
  //     },
  //     brand: {
  //       connect: {
  //         id: initialItems[0].brandId,
  //       }
  //     },
  //     itemGroup: {
  //       connectOrCreate: {
  //         where: {
  //           name: initialItems[0].itemGroupName
  //         },
  //         create: {
  //           name: initialItems[0].itemGroupName
  //         }
  //       }
  //     },
  //     itemStock: {
  //       create: {
  //         stockQty: 2
  //       }
  //     },
  //     itemImage: {
  //       create: {
  //         images: initialItemImages[0].images
  //       }
  //     },
  //     forSale: {
  //       create: {}
  //     },
  //     bestSeller: {
  //       create: undefined
  //     }
  //   }
  // })

  for (const item of initialItems) {
    await prisma.item.create({
      data: {
        name: item.name,
        url: item.url,
        price: item.price,
        priceDiscount: item.priceDiscount,
        category: {
          connect: {
            id: item.categoryId,
          }
        },
        brand: {
          connect: {
            id: item.brandId,
          }
        },
        itemGroup: {
          connectOrCreate: {
            where: {
              name: item.itemGroupName
            },
            create: {
              name: item.itemGroupName
            }
          }
        },
        itemStock: {
          create: {
            stockQty: 2
          }
        },
        itemImage: {
          create: {
            images: item.itemImages || ['no-image.webp']
          }
        },
        forSale: {
          create: item.forSale ? {} : undefined
        },
        bestSeller: {
          create: item.bestSeller ? {} : undefined
        }
      }
    })
  }


}
