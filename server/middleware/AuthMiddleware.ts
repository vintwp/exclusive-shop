import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError";

export type TTokenDecoded = {
  id: string;
  email: string;
  role: string;
}

export default function (
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

    req.user = decoded;
    next();
    
  } catch (e) {
    return res.status(403).json({ message: "Access denied. Token is expired or invalid" });
  }
}
