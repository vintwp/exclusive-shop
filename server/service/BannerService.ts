import ApiError from "../error/ApiError";
import { prisma } from "../prisma";
import { Banner } from "@prisma/client";


class BannerService {
  async get() {
    try {
      const bannerImages = await prisma.banner.findMany();

      return { data: bannerImages as Banner[]}

    } catch (error) {
      throw ApiError.badRequest('Banner not available');
    }
  }
}

export default new BannerService();