import { GraphQLError } from 'graphql';

/**
 * @description Base class for custom errors that can be safely exposed to the client.
 */
export class CustomError extends GraphQLError {
  constructor(message, code) {
    super(message, { extensions: { code } });
    // This is to make `instanceof` work correctly in Node.js
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}

/**
 * @description Error for when a resource is not found.
 */
export class NotFoundError extends CustomError {
  constructor(message = 'Resource not found.') {
    super(message, 'NOT_FOUND');
  }
}
