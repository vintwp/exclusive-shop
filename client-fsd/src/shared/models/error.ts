import { AuthError } from 'next-auth';

class NextAuthError extends AuthError {
  constructor(message?: string) {
    super();
    this.message = message || 'Unexpected Error';
    this.stack = undefined;

    Object.setPrototypeOf(this, NextAuthError.prototype);
  }
}

export { NextAuthError };
