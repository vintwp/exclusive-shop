import { NextFunction, Request, Response } from "express";
import { UserService } from "../service";
import ApiError from "../error/ApiError";
import { IRequest, IResponse, TUserUpdate, IResponseData } from "../types";
import {
  TUserRegistration,
  TUserLogin, TUserLoginResponse,
  TUserResponse
} from "../src/types/User";



class UserContoller {
  async registration(
    req: IRequest<TUserRegistration>,
    res: IResponse<{ data: TUserLoginResponse<'id' | 'name' | 'role'> }>,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const user = await UserService.registration(email, password);

      const response: IResponseData<TUserLoginResponse<'id' | 'name' | 'role'>> = {
        data: user,
        message: 'You have been successfully registered',
      }

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  async login(
    req: IRequest<TUserLogin>,
    res: IResponse<{ data: TUserLoginResponse<'id' | 'name' | 'role'> }>,
    next: NextFunction
  ) {
    try {
      const { email, password, oAuthId } = req.body;

      if (oAuthId) {
        const userOauthLogin = await UserService.loginOAuth(email, oAuthId);

        const response: IResponseData<TUserLoginResponse<'id' | 'name' | 'role'>> = {
          data: userOauthLogin,
          message: "You have been logged in",
        }
        
        return res.json(response);
      }

      const userCredentialsLogin = await UserService.login(email, password);

      const response: IResponseData<TUserLoginResponse<'id' | 'name' | 'role'>> = {
        data: userCredentialsLogin,
        message: "You have been logged in",
      }
      
      return res.json(response);      
    } catch (e) {
      return next(e);
    }
    
  }

  async refreshToken(
    req: IRequest<unknown>,
    res: IResponse<{ data: { access_token: string;  refresh_token: string } }>,
    next: NextFunction
  ) {

    try {
      const refreshToken = req.headers.authorization.split(' ')[1];
      const updatedTokens = await UserService.refreshToken(refreshToken);

      const response: IResponseData<{ access_token: string; refresh_token: string }> = {
        data: {
          ...updatedTokens
        }
      }

      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }

  async checkRole(req: Request, res: Response, next: NextFunction) {
    console.log(req, 'check Role');

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

  async getProfile(
    req: IRequest<{ id: string }>,
    res: IResponse<{ data: TUserResponse }>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const user = await UserService.getProfile(id);
      
      const response: IResponseData<TUserResponse> = {
        data: user
      }

      return res.json(response); 
    } catch (e) {
      next(e);
    }
  }

  async updateProfile(req: IRequest<TUserUpdate>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedUser = await UserService.updateProfile(id, updatedData);

      const response: IResponseData<TUserLoginResponse<'id' | 'name' | 'role'>> = {
        data: updatedUser
      }

      return res.json(response); 
      
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