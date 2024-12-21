// enum Status {
//   ok = 'ok',
//   error = 'error',
// }

// type ResponseStatus = 'success' | 'error';

// type ApiResponseOk<T> = {
//   status: Status.ok;
//   data: T;
// };

// type ApiResponseError = {
//   status: Status.error;
//   code: number;
//   message: string;
// };

// type ApiResponse<T extends ResStatus, K = undefined> = {
//   status: T;
//   code: T extends Extract<ResStatus, 'error'> ? number : never;
//   message: T extends Extract<ResStatus, 'error'> ? string : never;
//   data: T extends Extract<ResStatus, 'success'> ? K : never;
// };

// type ApiResponse<T extends ResponseStatus, K = undefined> =
//   T extends Extract<ResponseStatus, 'error'>
//     ? ApiResponseError
//     : ApiResponseOk<K>;

type ResponseOk<T> = {
  ok: true;
  data: T;
  message?: string;
};

type ResponseError = {
  ok?: false;
  status: number;
  message: string;
};

type ResponseApi<T = undefined> = T extends undefined
  ? ResponseError
  : ResponseOk<T>;

export type { ResponseApi };
