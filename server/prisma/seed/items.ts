import { prisma } from "./prismaClient";
import initialItems from "./items/index";
import { TItemOption } from './items/types';
import { checkImageAvailability } from "../../lib";

export async function createItems() {
  await prisma.itemImage.deleteMany();

  for (const initialItem of initialItems) {  
    await prisma.$transaction(async (prisma) => {
      const brand = await prisma.brand.findUnique({
        where: {
          id: initialItem.brandId
        }
      });

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
              images: checkImageAvailability(initialItem.itemImages)
            }
          },
          // forSale: {
          //   create: initialItem.forSale ? {} : undefined
          // },
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
          refineOptions: {
            connectOrCreate: [
              {
                where: {
                  categoryId_optionName_optionValue: {
                    optionName: 'brand',
                    optionValue: brand.name,
                    categoryId: initialItem.categoryId
                  }
                }, 
                create: {
                  optionName: 'brand',
                  optionValue: brand.name,
                  categoryId: initialItem.categoryId
                }
              },
              {
                where: {
                  categoryId_optionName_optionValue: {
                    optionName: 'stock',
                    optionValue: initialItem.stockQty > 0 ? 'In stock' : 'Out of stock',
                    categoryId: initialItem.categoryId
                  }
                }, 
                create: {
                  optionName: 'stock',
                  optionValue: initialItem.stockQty > 0 ? 'In stock' : 'Out of stock',
                  categoryId: initialItem.categoryId
                }
              },
            ]
          },
          // refineOptions: {
          //   create: [
          //     {
          //       optionName: 'stock',
          //       optionValue: initialItem.stockQty > 0 ? 'true' : 'false'
          //     },
          //     {
          //       optionName: 'brand',
          //       optionValue: brand.name
          //     },
          //   ]
          // }
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
