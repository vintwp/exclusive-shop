import { NextFunction, Request, Response } from "express";
import { StoreService } from "../service";
import { TRequest } from "../types";
import { convertIdToString } from "../lib";

class StoreController {
  async create(req: TRequest<{name: string}, unknown>, res: Response) {
    const { name } = req.body;

    const store = await StoreService.create(name);

    return res.json(convertIdToString(store));
  }

  async get(_: any, res: Response) {
    const stores = await StoreService.get();

    return res.json(convertIdToString(stores));
  }

  async update(req: TRequest<{id: string, name: string}>, res: Response,  next: NextFunction) {
    try {
      const { id, name } = req.body;
      console.log(id, name)

      const updatedStore = await StoreService.update({ id: +id, name });

      return res.json(convertIdToString(updatedStore));

    } catch (e) {
      return next(e);
    }
  }

  async delete(req: TRequest<unknown,{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deletedStore = await StoreService.delete(+id);

      return res.json(convertIdToString(deletedStore));

    } catch (e) {
      return next(e);
    }
  }
}

const storeController = new StoreController();

export default storeController;