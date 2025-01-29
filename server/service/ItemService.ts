import { prisma } from "../prisma";
import ApiError from "../error/ApiError";
import {
  TItemDB,
  TItemResponseDBWithTimer,
  TItemResponseDB,
  TItemGroupDB
} from "../src/types/Item";
import { createResponseItemFromDB } from "./lib";

const getItemIncludeConfig = {
  include: {
    category: {
      select: {
        id: true,
        url: true
      },
    },
    itemSpecification: {
      select: {
        specification: true
      }
    },
    itemStock: {
      select: {
        stockQty: true
      }
    },
    forSale: {
      select: {
        itemId: true,
      }
    },
    bestSeller: {
      select: {
        itemId: true,
      }
    },
    itemOur: {
      select: {
        itemId: true
      }
    },
    itemImage: true,
    review: {
      select: {
        id: true,
        rating: true,
        text: true,
        user: {
          select: {
            name: true,
            lastName: true,
          }
        },
        item: {
          select: {
            name: true
          }
        },
        createdAt: true,
      }
    },
    groupOptions: {
      select: {
        groupOption: true,
        groupOptionValue: true,
        groupOptionValueAdd: true,
        itemGroupKey: true,
        itemId: true,
      }
    }
  },
};

const getItemGroupKeyConfig = {
  select: {
    groupOption: true,
    groupOptionValue: true,
    groupOptionValueAdd: true,
    item: {
      select: {
        id: true,
        url: true,
        category: {
          select: {
            url: true,
          }
        }
      }
    },
  }
}

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

  async getAll() {
    const items = await prisma.item.findMany({
      ...getItemIncludeConfig
    });

    const responseItems = await Promise.all(
      items.map(async (item) => {
        const itemsGroupByKeyFromDB: TItemGroupDB[] = await prisma.groupOptions.findMany({
          where: {
            itemGroupKey: item.groupKey,
          },
          ...getItemGroupKeyConfig
        });
  
        const reponseItem = createResponseItemFromDB(item, itemsGroupByKeyFromDB);
  
        return reponseItem;
      })
    ) as TItemResponseDB[];

    return responseItems;
  }

  async getById(id: NonNullable<string>) {
    if (!id || !+id) {
      throw ApiError.badRequest('Invalid ID');
    }

    const itemById: TItemDB = await prisma.item.findUnique({
      where: {
        id: +id,
      },
      ...getItemIncludeConfig
      ,
    });

    const itemsGroupByKeyFromDB: TItemGroupDB[] = await prisma.groupOptions.findMany({
      where: {
        itemGroupKey: itemById.groupKey,
      },
      ...getItemGroupKeyConfig
    });

    const reponseItem = createResponseItemFromDB(itemById, itemsGroupByKeyFromDB);

    return reponseItem;
  }

  async getFlashSales() {
    const request = await prisma.flashSales.findMany({
      select: {
        item: {
          ...getItemIncludeConfig
        }
      }
    });

    const requestDeadline = await prisma.timer.findUnique({
      where: {
        timer: 'SALES'
      },
      select: {
        timerEnds: true,  
      }
    })

    const itemsSales = request.map(item => item.item);

    const response = await Promise.all(
      itemsSales.map(async (item) => {
        const itemsGroupByKeyFromDB: TItemGroupDB[] = await prisma.groupOptions.findMany({
          where: {
            itemGroupKey: item.groupKey,
          },
          ...getItemGroupKeyConfig
        });
  
        const reponseItem = createResponseItemFromDB(item, itemsGroupByKeyFromDB);
  
        return reponseItem;
      })
    ) as TItemResponseDB[];

    return {
      timerEnds: requestDeadline.timerEnds,
      items: response
    } as TItemResponseDBWithTimer;
  }

  async getBestSelling() {
    const items = await prisma.itemsBestSellers.findMany({
      select: {
        item: {
          ...getItemIncludeConfig,
        }
      }
    });

    const itemBestSelling = items.map(item => item.item);

    const response = await Promise.all(
      itemBestSelling.map(async (item) => {
        const itemsGroupByKeyFromDB: TItemGroupDB[] = await prisma.groupOptions.findMany({
          where: {
            itemGroupKey: item.groupKey,
          },
          ...getItemGroupKeyConfig
        });
  
        const reponseItem = createResponseItemFromDB(item, itemsGroupByKeyFromDB);
  
        return reponseItem;
      })
    ) as TItemResponseDB[];

    return response;
  }

  async getOurItems() {
    const request = await prisma.itemsOur.findMany({
      select: {
        item: {
          ...getItemIncludeConfig,
        }
      }
    });

    const items = request.map(item => item.item);

    const response = await Promise.all(
      items.map(async (item) => {
        const itemsGroupByKeyFromDB: TItemGroupDB[] = await prisma.groupOptions.findMany({
          where: {
            itemGroupKey: item.groupKey,
          },
          ...getItemGroupKeyConfig
        });
  
        const reponseItem = createResponseItemFromDB(item, itemsGroupByKeyFromDB);
  
        return reponseItem;
      })
    ) as TItemResponseDB[];

    return response;
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