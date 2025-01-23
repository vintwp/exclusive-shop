import { NextFunction, Request, Response } from "express";
import { StoreService } from "../service";
import { TRequest, TResponse } from "../types";
import { convertIdToString } from "../lib";
import { Store } from "@prisma/client";


class StoreController {
  async create(req: TRequest<{name: string}>, res: TResponse, next: NextFunction) {
    const { name } = req.body;

    try {
      const store = await StoreService.create(name);

      const response = {
        data: convertIdToString(store),
        message: store.message,
      }

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  async get(_: any, res: Response) {
    const stores = await StoreService.get();

    return res.json(convertIdToString(stores));
  }

  async update(req: TRequest<{id: string, name: string}>, res: Response,  next: NextFunction) {
    try {
      const { id, name } = req.body;
      console.log(id, name);

      const updatedStore = await StoreService.update({ id: +id, name });

      return res.json(convertIdToString(updatedStore));

    } catch (e) {
      return next(e);
    }
  }

  async delete(req: TRequest<unknown,{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const requestedDeletedStore = await StoreService.delete(+id);

      const response = {
        data: convertIdToString(requestedDeletedStore.data),
        message: requestedDeletedStore.message
      }

      console.log(response);

      return res.json(response);

    } catch (e) {
      return next(e);
    }
  }
}

const storeController = new StoreController();

export default storeController;