import { NextFunction, Request, Response } from "express";
import { UserService } from "../service";
import { generateJwt, vefiryJwt } from "../lib";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../error/ApiError";
import { TUserUpdate } from "../types";



class UserContoller {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;
      const jwtToken = await UserService.registration(email, password, role);

      return res.json(jwtToken);
    } catch (e) {
      return next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, oAuthId } = req.body;

      if (oAuthId) {
        const userResponse = await UserService.loginOAuth(email, oAuthId);
        
        return res.json(userResponse);
      }

      const userResponse = await UserService.login(email, password);

      return res.json(userResponse);      
    } catch (e) {
      return next(e);
    }
    
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.headers.authorization.split(' ')[1];
      const updatedTokens = await UserService.refreshToken(refreshToken);
      
      return res.json(updatedTokens);
    } catch (e) {
      return next(e);
    }
  }

  async checkRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { role } = req.user;

      if (role !== 'ADMIN') {
        throw ApiError.forbidden('Permission denied');
      }

      next();
      
    } catch (e) {
      next(e);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const userResponse = await UserService.getProfile(id);

      return res.json(userResponse); 
      
    } catch (e) {
      next(e);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as TUserUpdate;
      const userUpdated = await UserService.updateProfile(user);

      return res.json(userUpdated); 
      
    } catch (e) {
      return next(e);
    }
  }

  async getAll(_: any, res: Response) {
    const users = await UserService.getAll();

    return res.json(users);
  }
}


const userController = new UserContoller();

export default userController;