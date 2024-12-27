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
          brand: true,
          itemSpecification: {
            select: {
              specification: true
            }
          },
          itemGroup: {
            include: {
              items: {
                select: {
                  id: true,
                  url: true,
                  itemOption: {
                    select: {
                      optionName: true,
                      optionValue: true,
                    }
                  }
                }
              }
            }
          }
        },
      })

      return res.json({
        data: item,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new ItemContoller();