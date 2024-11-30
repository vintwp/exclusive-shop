import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { prisma } from "../prisma";
import { Device } from "@prisma/client";
import { UploadedFile } from "express-fileupload";
import ApiError from "../error/ApiError";

class DeviceService {
  async create(
    device: Omit<Device, 'id'> & { deviceInfo?: string },
    img: UploadedFile,
  ) {
    const { name, price, typeId, brandId, deviceInfo } = device;

    let imgName = '';

    if (img) {
      imgName = uuidv4() + ".jpg";
      img.mv(path.resolve(__dirname, '..', 'static', imgName));
    }

    if (
      !name || 
      !price ||
      !typeId ||
      !brandId
    ) {
      throw ApiError.badRequest('Required field is missing');
    }

    const newDevice = await prisma.device.create({
      data: {
        name: name,
        price:+price,
        typeId:+typeId,
        brandId:+brandId,
        img: imgName,
      }
    });

    return newDevice;
  }

  async getAll(
    brandId?: string,
    typeId?: string,
    perPage?: string,
    page?: string,
  ) {
    const currentPage = (page && +page) ? +page : 1;
    const perPageQty
      = (perPage && +perPage) ? +perPage : undefined;
    const offset
      = (currentPage && perPageQty) ? currentPage * perPageQty - perPageQty : 0;

    const result = await prisma.$transaction([
      prisma.device.count({
        where: {
          brandId: +brandId || undefined,
          typeId: +typeId || undefined,
        }
      }),
      prisma.device.findMany({
        where: {
          brandId: +brandId || undefined,
          typeId: +typeId || undefined,
        },
        include: {
          deviceInfo: true,
        },
        skip: offset,
        take: perPageQty
      })
    ])

    return {
      counter: result[0],
      data: result[1]
    };
  }

  async getById(id: Device['id'] | string) {
    if (!id || !+id) {
      throw ApiError.badRequest('Invalid ID');
    }

    const device = await prisma.device.findUnique({
      where: {
        id: +id,
      },
      include: {
        deviceInfo: true,
      }
    })

    return device;
  }

  async delete(id: Device['id'] | string) {
    if (!id || !+id) {
      throw ApiError.badRequest('Invalid ID');
    }

    const device = await prisma.device.delete({
      where: {
        id: +id,
      }
    })

    return device;
  }

  async update(device: Device) {

    const updatedDevice = await prisma.device.update({
      where: {
        id: device.id,
      }, 
      data: {
        ...device
      }
    })

    return updatedDevice;
  }

}

export default new DeviceService();