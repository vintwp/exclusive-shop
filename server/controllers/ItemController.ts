import { NextFunction, Request, Response } from "express";
import { ItemService } from "../service";

class ItemContoller {
  async getAll(_: any, res: Response) {
    const items = await ItemService.get();

    return res.json(items);
  }
}

export default new ItemContoller();