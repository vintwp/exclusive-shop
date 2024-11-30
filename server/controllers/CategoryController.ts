import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../service";
import { UploadedFile } from "express-fileupload";
import { saveFiles, isTrueSet, convertIdToString, deleteFiles, updateFiles } from "../lib";
import { TCategoryRequest, TCategoryResponseDB, TCategoryResponseServer } from "../src/types";
import { Store } from "@prisma/client";


function createCategoryResponse(data: TCategoryResponseDB | TCategoryResponseDB[]) {
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
  }) as TCategoryResponseServer;
}


class CategoryController {
  async create(req: Request, res: Response) {
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

    const reponseCategory = createCategoryResponse(category);

    return res.json(convertIdToString(reponseCategory));
  }

  async getAll(_: any, res: Response) {
    const categories = await CategoryService.getAll();
    const reponseCategories = createCategoryResponse(categories);

    return res.json(reponseCategories);
  }

  async update(req: IRequest<TCategoryRequest, { id: string }>, res: Response,  next: NextFunction) {
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

      const responseCategory = createCategoryResponse(updatedCategory);

      return res.json(responseCategory);

    } catch (e) {
      return next(e);
    }

  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const category = await CategoryService.getById(id);
      const reponseCategory = createCategoryResponse(category);

      return res.json(reponseCategory);

    } catch (e) {
      return next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { image } = await CategoryService.getById(id);

      await deleteFiles(image, 'categories');

      const category = await CategoryService.delete(id);

      return res.json(category);

    } catch (e) {
      return next(e);
    }
  }
}

const categoriesController = new CategoryController();

export default categoriesController;