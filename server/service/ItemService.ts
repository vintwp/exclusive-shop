import { prisma } from "../prisma";
import { Store } from "@prisma/client";
import { createUrl } from "../lib";
import ApiError from "../error/ApiError";

class ItemService {
  // async create(name: NonNullable<string>) {
  //   try {
  //     const req = await prisma.store.create({
  //       data: {
  //         name,
  //         url: createUrl(name),
  //       }
  //     });

  //     return { data: req as Store, message: message.create.ok };
  //   } catch (error) {
  //     throw ApiError.forbidden(message.create.error)
  //   }   
  // }

  // async update(store: Pick<Store, 'id' | 'name'>) {
  //   const { id, name } = store;

  //   const req = await prisma.store.update({
  //     where: {
  //       id
  //     }, data: {
  //       name,
  //       url: createUrl(name)
  //     }
  //   });

  //   return { data: req as Store };
  // }

  async get() {
    const req = await prisma.item.findMany({
      select: {
        id: true,
        name: true,
        url: true,
        price: true,
        priceDiscount: true,
        ourItem: true,
        category: {
          select: {
            name: true
          }
        },
        brand: {
          select: {
            name: true
          }
        },
        itemStock: {
          select: {
            stockQty: true,
          }
        },
        itemImage: {
          select: {
            images: true
          }
        },
        forSale: true,
        bestSeller: true
      }
    });

    console.log(req)
    
    return { data: req };
  }

  // async delete(id: number) {
  //   try {
  //     const req = await prisma.store.delete({
  //       where: {
  //         id,
  //       }
  //     });
      
  //     return {
  //       data: req as Store,
  //       message: message.delete.ok,
  //     }

  //   } catch (error) {
  //     throw ApiError.forbidden(message.delete.error)
  //   }
  // }
}


export default new ItemService();