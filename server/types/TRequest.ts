import { Request, Response } from 'express';
import { Send } from 'express-serve-static-core';

interface Json {
  data: any;
  message?: string;
}

interface IRequest<T = undefined> extends Request {
  body: T,
}

interface IResponseData<T> {
  data: any,
  message?: string;
}

interface IResponse<T extends IResponseData<T>> extends Response {
  json: Send<T, this>;
}



export { IRequest, IResponse, IResponseData };