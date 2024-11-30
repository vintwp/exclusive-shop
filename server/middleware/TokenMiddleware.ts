import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function (
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (req.method === 'OPTIONS') {
    next();
  }
  
  try {
    const token = jwt.decode(req.headers.authorization.split(' ')[1]) as JwtPayload;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }  

    if (Date.now() >= token.exp * 1000) {
      return res.status(401).json({ message: "Token is expired. Try login again" });
    }

    next();
    
  } catch (e) {
    return res.status(500).json({ message: "Unexprected error" });
  }
}
