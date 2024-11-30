class ApiError extends Error {
  __proto__: Error; // fix instanceof Error class for TS

  constructor(public status?: number, message?: string) {
    const protoError = new.target.prototype; // fix instanceof Error class for TS

    super();
    this.status = status;
    this.message = message;

    this.__proto__ = protoError; // fix instanceof Error class for TS
  }

  static badRequest(message: string) {
    return new ApiError(404, message);
  }

  static internal(message : string) {
    return new ApiError(500, message);
  }

  static forbidden(message: string) {
    return new ApiError(403, message);
  }

  static alreadyExist(message: string) {
    return new ApiError(409, message);
  }
}

export default ApiError;