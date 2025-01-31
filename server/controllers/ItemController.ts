import { NextFunction } from "express";
import { ItemService } from "../service";
import { IRequest, IResponse } from "../types";
import { TItemResponse, TItemResponseDB, TItemResponseWithTimer } from "../src/types/Item";
import { createItemResponseFromServer } from "./lib";


class ItemContoller {
  async getAll(
    req: IRequest<any>,
    res: IResponse<{ data: TItemResponse[] }>
  ) {
    const items = await ItemService.getAll();
    const itemsResponse = createItemResponseFromServer(items) as TItemResponse[];

    return res.json({
      data: itemsResponse,
    });
  }

  async getById(
    req: IRequest<any>,
    res: IResponse<{ data: TItemResponse }>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const item = await ItemService.getById(id);
      const itemResponse = createItemResponseFromServer(item)


      return res.json({
        data: itemResponse,
      });
    } catch (error) {
      console.log(error)
      return next(error);
    }
  }

  async getFlashSales(
    req: IRequest<any>,
    res: IResponse<{ data: TItemResponseWithTimer }>,
    next: NextFunction
  ) {
    try {
      const { items, timerEnds } = await ItemService.getFlashSales();
      const responseItems = createItemResponseFromServer(items);

      return res.json({
        data: {
          items: responseItems,
          timerEnds
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  async getBestSelling(
    req: IRequest<any>,
    res: IResponse<{ data: TItemResponse[] }>,
    next: NextFunction
  ) {
    try {
      const query = req.query.query as string;
      const items = await ItemService.getBestSelling();
      const itemsResponse = createItemResponseFromServer(items);

      if (query) {
        const itemsByQty = +query;

        const itemsResponseTrimmed = itemsResponse.slice(0, itemsByQty);

        return res.json({
          data: itemsResponseTrimmed,
        });
      }

      return res.json({
        data: itemsResponse,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getOurItems(
    req: IRequest<any>,
    res: IResponse<{ data: TItemResponse[] }>,
    next: NextFunction
  ) {
    try {
      const query = req.query.query as string;
      const items = await ItemService.getOurItems();
      const itemsResponse = createItemResponseFromServer(items);

      if (query) {
        const itemsByQty = +query;

        const itemsResponseTrimmed = itemsResponse.slice(0, itemsByQty);

        return res.json({
          data: itemsResponseTrimmed,
        });
      }

      return res.json({
        data: itemsResponse,
      })
      
    } catch (error) {
      return next(error);
    }
  }
}

export default new ItemContoller();