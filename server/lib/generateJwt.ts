import jwt from "jsonwebtoken";
import { compareObjects } from "./utils";

type TToken = 'access' | 'refresh';
type TUserJwt = {
  userId: number;
  email: string;
  role: string;
  exp: number;
}

export const generateJwt = (user: Omit<TUserJwt, 'exp'>, type: TToken = 'access') => {
  if (type === 'access') {
    return jwt.sign(
      user,
      process.env.JWT_ACCESS_TOKEN_KEY,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES },
    );
  }
  return jwt.sign(
    user,
    process.env.JWT_REFRESH_TOKEN_KEY,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES },
  );
};

export const vefiryJwt = (token: string, type: TToken = 'access') => {
  try {
    const keyToValidate
      = type === 'access'
        ? process.env.JWT_ACCESS_TOKEN_KEY
        : process.env.JWT_REFRESH_TOKEN_KEY

    const verifiedToken = jwt.verify(token, keyToValidate) as TUserJwt;

    return verifiedToken;
    
  } catch (error) {

    return false;
  }
};