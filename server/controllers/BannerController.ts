import { NextFunction } from "express";
import { Banner } from "@prisma/client";
import { BannerService } from "../service";
import { IRequest, IResponse } from "../types";

class BannerController {
  async get(
    req: IRequest<any>,
    res: IResponse<{ data: Banner[] }>,
    next: NextFunction
  ) {
    try {
      const banner = await BannerService.get();

      return res.json({
        data: banner.data,
      });

    } catch (e) {
      next(e);
    }
  }
}

export default new BannerController();