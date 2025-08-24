import { unwrapResolverError } from '@apollo/server/errors';
import { CustomError } from './errors.js';
import { logger } from '../logging/logger.js';

/**
 * @description Centralized error formatter for Apollo Server.
 * It logs unexpected errors and formats errors before sending them to the client.
 * @param {object} formattedError The formatted error.
 * @param {unknown} error The original error.
 * @returns The final error shape to be sent to the client.
 */
export const formatError = (formattedError, error) => {
  const originalError = unwrapResolverError(error);

  // If it's one of our custom, "safe" errors, let it pass through.
  if (originalError instanceof CustomError) {
    return {
      message: originalError.message,
      path: formattedError.path,
      locations: formattedError.locations,
      extensions: originalError.extensions,
    };
  }

  // For any other unexpected error, log it for debugging.
  // This will send the error to New Relic via our OTel logger.
  logger.error('Unhandled GraphQL error', {
    'error.message': originalError.message,
    'error.stack': originalError.stack,
    'graphql.query.path': formattedError.path?.join('.'),
  });

  // And return a generic message to the client to avoid leaking details.
  return {
    message: 'An unexpected error occurred. Please try again later.',
    extensions: {
      code: 'INTERNAL_SERVER_ERROR',
    },
  };
};
