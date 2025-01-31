import ApiError from "../error/ApiError";
import { prisma } from "../prisma";
import { Banner, PromoCategory, PromoNewArrival } from "@prisma/client";


class PromoService {
  async banner_get() {
    try {
      const bannerImages = await prisma.banner.findMany() as Banner[];

      return { data: bannerImages }

    } catch (error) {
      throw ApiError.badRequest('Banner not available');
    }
  }

  async category_get() {
    try {
      const promoCategory = await prisma.promoCategory.findMany() as PromoCategory[];
      const promoCategoryTimer = await prisma.timer.findFirst({
        where: {
          timer: 'PROMO'
        }
      });

      const response: PromoCategory & { timerEnds: Date } = {
        ...promoCategory[0],
        timerEnds: promoCategoryTimer.timerEnds,
      }

      return {
        data: response
      }
      
    } catch (error) {
      throw ApiError.badRequest('Category not available');
    }
  }

  async new_arrival_get() {
    try {
      const promoNewArrival = await prisma.promoNewArrival.findMany() as PromoNewArrival[];

      return { data: promoNewArrival }
      
    } catch (error) {
      throw ApiError.badRequest('Category not available');
    }
  }
}

export default new PromoService();