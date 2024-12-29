import { prisma } from "./prismaClient";

import initialItems from "./items/index";
import { TItemOption } from './items/types';

function getPropertyCaseInsensitive<
  T extends Record<string, string>,
  K extends Extract<keyof T, string>
>(obj: T, prop: K) {
  const propLowerCase = prop.toLowerCase();
  const objectPropValue = Object.keys(obj).find(key => key.toLowerCase() === propLowerCase)

  return objectPropValue ? obj[objectPropValue] : '';
};


export async function createItems() {
  await prisma.itemImage.deleteMany();

  for (const initialItem of initialItems) {  
    await prisma.$transaction(async (prisma) => {
      const { id } = await prisma.item.create({
        data: {
          name: initialItem.name,
          url: initialItem.url,
          price: initialItem.price,
          priceDiscount: initialItem.priceDiscount,
          category: {
            connect: {
              id: initialItem.categoryId,
            }
          },
          brand: {
            connect: {
              id: initialItem.brandId,
            }
          },
          itemStock: {
            create: {
              stockQty: initialItem.stockQty
            }
          },
          itemImage: {
            create: {
              images: initialItem.itemImages || ['no-image.webp']
            }
          },
          forSale: {
            create: initialItem.forSale ? {} : undefined
          },
          bestSeller: {
            create: initialItem.bestSeller ? {} : undefined
          },
          itemSpecification: {
            create: {
              specification: initialItem.spec
            }
          },
          groupKey: initialItem.groupKey,
          groupOptions: {
            create:
              Object.keys(initialItem.groupOptions).map(key => {
                const k = key as keyof TItemOption;
                const value = initialItem.groupOptions[k];

                return {
                  groupOption: k,
                  groupOptionValue: value,
                }
              })
          },
        }
      });

      if (initialItem.groupOptions.COLOR) {
        const color = initialItem.groupOptions.COLOR;

        const { hex } = await prisma.colors.findFirst({
          where: {
            name: {
              contains: color,
              mode: 'insensitive'
            }
          }, select: {
            hex: true
          }
        });
        

        await prisma.groupOptions.update({
          where: {
            itemId_groupOption: {
              itemId: id,
              groupOption: 'COLOR',
            }
          },
          data: {
            groupOptionValueAdd: hex,
          }
        })
      }
    })
  }
  
}
