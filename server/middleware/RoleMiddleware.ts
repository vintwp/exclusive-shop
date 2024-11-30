import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { type TTokenDecoded } from "./AuthMiddleware";
import { Role as PrismaUserRole} from "@prisma/client";

export default function (role: PrismaUserRole) {
  return function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.method === 'OPTIONS') {
      next();
    }
    
    try {
      const token = req.headers.authorization.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY) as TTokenDecoded;

      if (decoded.role !== role) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      req.user = decoded;
      next();
      
    } catch (e) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
  }
}