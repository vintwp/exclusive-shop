import { NextFunction } from "express";
import { ContactMessage } from "@prisma/client";
import { IRequest, IResponse, IResponseData } from "../types";
import { ContactService } from "../service";

class ContactController {
  async get(
    req: IRequest<any>,
    res: IResponse<{ data: ContactMessage[] }>,
    next: NextFunction
  ) {
    try {
      const messagesFromUsers = await ContactService.get();

      return res.json({
        data: messagesFromUsers,
      })

    } catch (error) {
      next(error);
    }
  }

  async create(
    req: IRequest<Omit<ContactMessage, 'id' | 'answered' | 'createdAt'>>,
    res: IResponse<{ data: ContactMessage }>,
    next: NextFunction
  ) {
    try {
      const newMessageFromUser = await ContactService.create(req.body);
      const response: IResponseData<ContactMessage> = {
        data: newMessageFromUser,
        message: 'Your request was sent',
      }

      return res.json(response);
    } catch (error) {
      return next(error);
    }
  }
}

export default new ContactController();