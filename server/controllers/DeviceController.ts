import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { DeviceService } from "../service";
import ApiError from "../error/ApiError";

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
   
    try {
      const device = await DeviceService.create(
        req.body,
        req.files?.img as UploadedFile
      );
        
      return res.json(device);
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { brandId, typeId, perPage, page } = req.query;
      const devices
        = await DeviceService.getAll(
          brandId as string,
          typeId as string,
          perPage as string,
          page as string,
        );

      return res.json(devices);
    } catch (e) {
      return next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const device = await DeviceService.getById(req.params.id);

      return res.json(device);
      
    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const device = await DeviceService.delete(req.params.id);

      return res.json(device);
      
    } catch (e) {
      return next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const device = await DeviceService.update(req.body);

      return res.json(device);
      
    } catch (e) {
      return next(e);
    }
  }
}


const deviceController = new DeviceController();

export default deviceController;