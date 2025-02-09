import { prisma } from "../prisma";
import { ContactMessage } from "@prisma/client";
import ApiError from "../error/ApiError";

class ContactService {
  async get() {
    try {
      const messagesFromUsers = await prisma.contactMessage.findMany();

      return messagesFromUsers as ContactMessage[];
    } catch (error) {
      throw ApiError.internal('Error caused by internal fault.');
    }
    
  }

  async create(newMessage: Omit<ContactMessage, 'id' | 'answered' | 'createdAt'>) {
    try {
      const req = await prisma.contactMessage.create({
        data: {
          ...newMessage,
          answered: false,
        }
      });

      return req as ContactMessage;
    } catch (error) {
      throw ApiError.internal('Error caused by internal fault.');
    }

  }

}

export default new ContactService;