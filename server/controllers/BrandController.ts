import { NextFunction, Request, Response } from "express";
import { BrandService } from "../service";
import { parse } from 'csv-parse/sync';
import { UploadedFile } from "express-fileupload";


class BrandContoller {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    const brand = await BrandService.create(name);

    return res.json(brand);
  }

  async getAll(_: any, res: Response) {
    const brands = await BrandService.getAll();

    return res.json(brands);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const brand = req.body;
      const updatedBrand = await BrandService.update(brand);

      return res.json(updatedBrand);

    } catch (e) {
      return next(e);
    }

  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const brand = await BrandService.getById(id);

      return res.json(brand);

    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const brand = await BrandService.delete(id);

      return res.json(brand);

    } catch (e) {
      return next(e);
    }
  }

  async createMany(req: Request, res: Response, next: NextFunction) {
    // upload csv file like
    /*    
      name
      Apple
      Samsung
      Nokia
      ...
    */

    try {
      const brandsFile = req.files.file as UploadedFile;
      
      const parsedFile = parse(brandsFile.data, {
        columns: true,
        skip_empty_lines: true
      });

      const brands = await BrandService.createMany(parsedFile);

      return res.json(brands);
      
    } catch (e) {
      return next(e);
    }
  }
}

export default new BrandContoller();