import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../service";
import { UploadedFile } from "express-fileupload";
import { saveFiles, isTrueSet, convertIdToString, deleteFiles, updateFiles, checkImageAvailability } from "../lib";
import { TCategoryRequest, TCategoryResponseDB, TCategoryResponseServer } from "../src/types";
import { Brand, Store } from "@prisma/client";
import { IRequest, IResponse, IResponseData } from "../types";


function createCategoryResponse(
  data: TCategoryResponseDB | TCategoryResponseDB[]
): TCategoryResponseServer | TCategoryResponseServer[] {
  const addStoresForResponse = (data: Array<{ store: Store }>) => {
    return data.map(addStore => (addStore.store))
  };

  if (Array.isArray(data)) {
    const responseData = data.map(d => {
      return {
        ...d,
        additionalStores: addStoresForResponse(d.additionalStores)
      }
    });

    return convertIdToString(responseData)
  }

  return convertIdToString({
    ...data,
    additionalStores: addStoresForResponse(data.additionalStores),
  });
}


class CategoryController {
  async create(
    req: IRequest<{ name: string, primaryStoreId: string, displayOnMainPage: string }>,
    res: IResponse<{ data: TCategoryResponseServer }>
  ) {
    const { name, primaryStoreId, displayOnMainPage } = req.body;
    const icon = req?.files.files as UploadedFile;
    
    const categoryIconName = await saveFiles(icon, 'categories');
    const displayCategory = isTrueSet(displayOnMainPage);
 
    const category = await CategoryService.create({
      name,
      primaryStoreId,
      displayOnMainPage: displayCategory,
      image: categoryIconName,
    });

    const reponseCategory
      = createCategoryResponse(category) as TCategoryResponseServer;

    return res.json({
      data: reponseCategory,
    });
  }

  async getAll(_: any, res: IResponse<{ data: TCategoryResponseServer[] } >) {
    const categories = await CategoryService.getAll();
    const reponseCategories = createCategoryResponse(categories) as TCategoryResponseServer[];

    return res.json({ data: reponseCategories });
  }

  async update(
    req: IRequest<TCategoryRequest>,
    res: IResponse<{ data: TCategoryResponseServer }>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { name, primaryStoreId, displayOnMainPage, additionalStoreId } = req.body;

      // work with icon
      const icon = req?.files ? req.files.files as UploadedFile : undefined;
      const { image } = await CategoryService.getById(id);
      const iconPath = icon ? await saveFiles(icon, 'categories') : image;
      
      // convert string to boolean
      const displayCategory = isTrueSet(displayOnMainPage);

      // convert additonal id string to array
      const additionalStoreIds = additionalStoreId ? additionalStoreId.split(',') : [];
      
      const updatedCategory = await CategoryService.update({
        id,
        name,
        primaryStoreId: +primaryStoreId,
        displayOnMainPage: displayCategory,
        image: iconPath,
        additionalStoreId: additionalStoreIds,
      });

      const responseCategory = createCategoryResponse(updatedCategory) as TCategoryResponseServer;

      return res.json({
        data: responseCategory
      });

    } catch (e) {
      return next(e);
    }

  }

  async getById(
    req: IRequest<any>,
    res: IResponse<{ data: TCategoryResponseServer }>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const category = await CategoryService.getById(id);
      const reponseCategory = createCategoryResponse(category) as TCategoryResponseServer;

      return res.json({
        data: reponseCategory,
      });

    } catch (e) {
      return next(e);
    }
  }

  async delete(
    req: IRequest<any>,
    res: IResponse<{ data: TCategoryResponseServer }>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { image } = await CategoryService.getById(id);

      await deleteFiles(image, 'categories');

      const category = await CategoryService.delete(id);
      const reponseCategory = createCategoryResponse(category) as TCategoryResponseServer;

      return res.json({
        data: reponseCategory,
      });

    } catch (e) {
      return next(e);
    }
  }

  async getBrandsByCategory(
    req: IRequest<any>,
    res: IResponse<{ data: Brand[] }>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const brands = await CategoryService.getBrandsByCategory(id);
      
      return res.json({
        data: brands,
      });
    } catch (error) {
      return next(error);
    }
  }
}

const categoriesController = new CategoryController();

export default categoriesController;