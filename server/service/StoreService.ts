import { prisma } from "../prisma";
import { Prisma, Store } from "@prisma/client";
import { createUrl } from "../lib";
import ApiError from "../error/ApiError";

const message = {
  delete: {
    ok: "Store was successfully deleted",
    error: "The store cannot be deleted because it has categories that are specified as the main one. Please, delete first the categories for which this store is the main one"
  },
  create: {
    ok: 'Store was successfully created',
    error: "Store wasn't created due to a internal error",
  },
  update: {
    ok: 'Store was successfully updated',
    error: "Store wasn't updated due to a internal error",
  },
  getMany: {
    error: "Store could not be retrieved due to an internal error",
  }
}


class StoreService {
  async create(name: NonNullable<string>) {
    try {
      const url = createUrl(name);

      const req = await prisma.store.create({
        data: {
          name,
          url,
        }
      });

      return { data: req as Store, message: message.create.ok };
    } catch (error) {
      throw ApiError.forbidden(message.create.error)
    }   
  }

  async update(store: Pick<Store, 'id' | 'name'>) {
    const { id, name } = store;

    const req = await prisma.store.update({
      where: {
        id
      }, data: {
        name,
        url: createUrl(name)
      }
    });

    return { data: req as Store };
  }

  async get() {
    const req = await prisma.store.findMany();
    
    return { data: req as Store[] };
  }

  async delete(id: number) {
    try {
      const req = await prisma.store.delete({
        where: {
          id,
        }
      });
      
      return {
        data: req as Store,
        message: message.delete.ok,
      }

    } catch (error) {
      throw ApiError.forbidden(message.delete.error)
    }
  }
}


export default new StoreService();