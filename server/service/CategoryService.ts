import ApiError from "../error/ApiError";
import { prisma } from "../prisma";
import { Brand, Category, Store } from "@prisma/client";
import { deleteFiles, createUrl, convertIdToString } from "../lib";
import { TCategoryResponseDB } from "../src/types";

const selectConfig = {
  id: true,
  name: true,
  url: true,
  primaryStoreId: true,
  primaryStore: true,
  additionalStores: {
    select: {
      store: true
    }
  },
  displayOnMainPage: true,
  image: true,
  createdAt: true,
  updatedAt: true,
}

class CategoryService {
  async create(newCategory: Pick<Category, 'name' | 'image' | 'displayOnMainPage'> & { primaryStoreId : string}) {
    const category = await prisma.category.create({
      data: {
        name: newCategory.name,
        image: newCategory.image,
        displayOnMainPage: newCategory.displayOnMainPage,
        url: createUrl(newCategory.name),
        primaryStore: {
          connect: {
            id: +newCategory.primaryStoreId,
          }
        },
      },
      select: {
        ...selectConfig
      },
    });

    return category as TCategoryResponseDB;
  }

  async getAll() {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        url: true,
        primaryStoreId: true,
        primaryStore: true,
        additionalStores: {
          select: {
            store: true
          }
        },
        displayOnMainPage: true,
        image: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    return categories as TCategoryResponseDB[];
  }

  async update(
    category:
      Pick<Category, 'name' | 'primaryStoreId' | 'displayOnMainPage' | 'image'>
        & { id: string, additionalStoreId: string[] }
  ) {
    const updatedCategory = await prisma.category.update({
      where: {
        id: +category.id,
      },
      data: {
        name: category.name,
        primaryStore: {
          connect: {
            id: +category.primaryStoreId
          }
        },
        displayOnMainPage: category.displayOnMainPage,
        image: category.image,
        url: createUrl(category.name),
        additionalStores: {
          deleteMany: {},
          create:
            category.additionalStoreId.map(v => {
              return {
                store: {
                  connect: {
                    id: +v
                  }
                }
              }
            })
        }
      },
      select: {
        id: true,
        name: true,
        url: true,
        primaryStoreId: true,
        primaryStore: true,
        additionalStores: {
          select: {
            store: true
          }
        },
        displayOnMainPage: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedCategory as TCategoryResponseDB;
  }

  async getById(id: NonNullable<string>) {
    if (!id || !+id) {
      throw ApiError.badRequest('Invalid ID');
    }

    const category = await prisma.category.findUnique({
      where: {
        id: +id,
      },
      select: {
        ...selectConfig,
        refineOption: {
          include: {
            itemsRefine: {
              where: {
                refineOptions: {
                  some: {
                    optionName: 'stock',
                    optionValue: 'Out of stock',
                  }
                }
              }
            }
          }
        }
      },
    });

    return category as TCategoryResponseDB;
  }

  async delete(id: NonNullable<string>) {
    if (!id || !+id) {
      throw ApiError.badRequest('Invalid ID');
    }

    try {
      await prisma.category.update({
        where: {
          id: +id,
        },
        data: {
          additionalStores: {
            deleteMany: {}
          }
        }
      });
  
      const category = await prisma.category.delete({
        where: {
          id: +id,
        },
        select: {
          ...selectConfig
        }
        
      });

      return category as TCategoryResponseDB;
    } catch (error) {
      console.log(error);
    }
  }

  async getBrandsByCategory(id: NonNullable<string>) {
    if (!id || !+id) {
      throw ApiError.badRequest('Invalid ID');
    }

    const categoryBrands = await prisma.category.findUnique({
      where: {
        id: +id
      }, include: {
        brands: {
          select: {
            brand: true
          }
        }
      }
    });

    const brands = categoryBrands.brands.map(v => v.brand);

    return brands as Brand[];
  }
};


export default new CategoryService();