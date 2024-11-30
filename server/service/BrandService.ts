import ApiError from "../error/ApiError";
import { prisma } from "../prisma";
import { BrandDevice } from "@prisma/client";

class BrandService {
  async create(name: BrandDevice['name']) {
  
    const newBrand = await prisma.brandDevice.create({
      data: {
        name,
      },
    })

    return newBrand;
  }

  async getAll() {
    const brands = await prisma.brandDevice.findMany();

    return brands;
  }

  async update(brand: BrandDevice) {
    const { id } = brand;

    const updatedBrand = await prisma.brandDevice.update({
      where: {
        id,
      },
      data: {
        ...brand
      }
    });

    return updatedBrand;
  }

  async getById(id: NonNullable<string>) {
    if (!id || !+id) {
      throw ApiError.badRequest('Invalid ID');
    }

    const brand = await prisma.brandDevice.findUnique({
      where: {
        id: +id,
      }
    });

    return brand;
  }

  async delete(id: NonNullable<string>) {
    if (!id || !+id) {
      throw ApiError.badRequest('Invalid ID');
    }

    const brand = await prisma.brandDevice.delete({
      where: {
        id: +id,
      }
    });

    return brand;
  }

  async createMany(brands: Array<Pick<BrandDevice, 'name'>>) {
    const brandsUploaded = prisma.brandDevice.createManyAndReturn({
      data: [...brands]
    });

    return brandsUploaded;
  }
}

export default new BrandService();