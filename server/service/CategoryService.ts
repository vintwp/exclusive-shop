import ApiError from "../error/ApiError";
import { prisma } from "../prisma";
import { Category, Store } from "@prisma/client";
import { deleteFiles, createUrl, convertIdToString } from "../lib";
import { TCategoryResponseDB } from "../src/types";

class CategoryService {
  async create(newCategory: Pick<Category, 'name' | 'primaryStoreId' | 'image' | 'displayOnMainPage'>) {
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
    

    const additionalStores = category.additionalStoreId.length ? {
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
    } : {}

    console.log(category.additionalStoreId)
    console.log(category.additionalStoreId.length)
      
    const updatedCategory = await prisma.category.update({
      where: {
        id: +category.id,
      },
      data: {
        name: category.name,
        primaryStoreId: +category.primaryStoreId,
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

    // const updatedCategory = await prisma.category.update({
    //   where: {
    //     id: +category.id,
    //   },
    //   data: {
    //     name: category.name,
    //     primaryStoreId: +category.primaryStoreId,
    //     displayOnMainPage: category.displayOnMainPage,
    //     image: category.image,
    //     url: createUrl(category.name),
    //     additionalStores: {
    //       deleteMany: {},
    //       create:
    //         category.additionalStoreId.map(v => {
    //           return {
    //             store: {
    //               connect: {
    //                 id: +v
    //               }
    //             }
    //           }
    //         })
    //     }
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     url: true,
    //     primaryStoreId: true,
    //     primaryStore: true,
    //     additionalStores: {
    //       select: {
    //         store: true
    //       }
    //     },
    //     displayOnMainPage: true,
    //     image: true,
    //     createdAt: true,
    //     updatedAt: true,
    //   },
    // });

    console.log(updatedCategory, 'updated category');

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

    return category as TCategoryResponseDB;
  }

  async delete(id: NonNullable<string>) {
    if (!id || !+id) {
      throw ApiError.badRequest('Invalid ID');
    }

    const category = await prisma.category.delete({
      where: {
        id: +id,
      }
    }); 

    return category as Category;
  }
};


export default new CategoryService();