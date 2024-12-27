import { prisma } from "./prismaClient";
import type { Specification } from "./items/types";

import initialItems  from "./items/index";

function getPropertyCaseInsensitive<
  T extends Record<string, string>,
  K extends Extract<keyof T, string>
>(obj: T, prop: K) {
  const propLowerCase = prop.toLowerCase();
  const objectPropValue = Object.keys(obj).find(key => key.toLowerCase() === propLowerCase)

  return objectPropValue ? obj[objectPropValue] : '';
};


export async function createItems() {
  await prisma.itemGroup.deleteMany({
    where: {}
  });
  

  await prisma.itemImage.deleteMany();

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
        itemStock: {
          create: {
            stockQty: item.stockQty
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
        },
        itemSpecification: {
          create: {
            specification: item.spec
          }
        },
        itemGroup: {
          connectOrCreate: {
            where: {
              itemGroupName: item.itemGroup.groupName
            },
            create: {
              itemGroupName: item.itemGroup.groupName
            }
          }
        },
        itemOption: {
          create:
            item.itemGroup.optionKeys.map(opt => {
              return {
                optionName: opt,
                optionValue: getPropertyCaseInsensitive(item.spec, opt)
              }
            })
        }
      }
    })
  }
}
