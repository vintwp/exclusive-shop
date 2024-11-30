export type ApiErrorResponse = {
  status?: number;
  message?: string;
};

class ApiError extends Error {
  status: number;

  constructor(data: ApiErrorResponse) {
    super();
    this.message = data.message || 'Unexpected Error';
    this.status = data.status || 400;
    this.stack = undefined;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
