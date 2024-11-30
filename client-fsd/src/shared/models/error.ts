import { AuthError } from 'next-auth';

// class NextAuthError extends AuthError {
//   __proto__: Error;

//   constructor(message?: string) {
//     const protoError = new.target.prototype; // fix instanceof Error class for TS

//     super();
//     this.message = message || 'Unexpected Error';
//     this.stack = undefined;

//     this.__proto__ = protoError; // fix instanceof Error class for TS
//   }
// }

class NextAuthError extends AuthError {
  constructor(message?: string) {
    super();
    this.message = message || 'Unexpected Error';
    this.stack = undefined;

    Object.setPrototypeOf(this, NextAuthError.prototype);
  }
}

export { NextAuthError };
