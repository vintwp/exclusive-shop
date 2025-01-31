import { NextFunction } from "express";
import { Banner, PromoCategory, PromoNewArrival } from "@prisma/client";
import { PromoService } from "../service";
import { IRequest, IResponse } from "../types";

class PromoController {
  async banner_get(
    req: IRequest<any>,
    res: IResponse<{ data: Banner[] }>,
    next: NextFunction
  ) {
    try {
      const banner = await PromoService.banner_get();

      return res.json({
        data: banner.data,
      });

    } catch (e) {
      next(e);
    }
  }

  async category_get(
    req: IRequest<any>,
    res: IResponse<{ data: PromoCategory & { timerEnds: Date } }>,
    next: NextFunction
  ) {
    try {
      const category = await PromoService.category_get();

      return res.json({
        data: category.data,
      });

    } catch (e) {
      next(e);
    }
  }

  async new_arrival_get(
    req: IRequest<any>,
    res: IResponse<{ data: PromoNewArrival[] }>,
    next: NextFunction
  ) {
    try {
      const newArrivals = await PromoService.new_arrival_get();

      return res.json({
        data: newArrivals.data,
      });

    } catch (e) {
      next(e);
    }
  }
}

export default new PromoController();