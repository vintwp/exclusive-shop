import { NextFunction, Request, Response } from "express";
import { ItemService } from "../service";
import { IRequest, IResponse } from "../types";

class ItemContoller {
  async getAll(_: any, res: Response) {
    const items = await ItemService.get();

    return res.json(items);
  }

  async getById(
    req: IRequest<any>,
    res: IResponse<{ data: any }>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const item = await prisma.item.findUnique({
        where: {
          id: +id,
        },
        include: {
          
          itemSpecification: {
            select: {
              specification: true
            }
          },
          groupOptions: {
            select: {
              itemId: true,
              groupOption: true,
              groupOptionValue: true,
              groupOptionValueAdd: true
            }
          }
        },
      });

      const group = await prisma.item.findMany({
        where: {
          groupKey: item.groupKey
        },
        select: {
          groupOptions: true,
        }
      })

      return res.json({
        data: { item: item , group: group},
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new ItemContoller();