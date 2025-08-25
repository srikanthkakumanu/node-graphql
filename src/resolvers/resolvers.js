import { authorResolvers } from './authorResolver.js';
import { bookResolvers } from './bookResolver.js';
import { genreResolvers } from './genreResolver.js';
import { reviewResolvers } from './reviewResolver.js';

/**
 * Merged resolver object for the Apollo Server.
 * It combines queries, mutations, and type-specific resolvers
 * from different resolver files into a single structure.
 */
export const resolvers = {
  Query: {
    ...authorResolvers.Query,
    ...bookResolvers.Query,
    ...genreResolvers.Query,
    ...reviewResolvers.Query,
  },
  Mutation: {
    ...authorResolvers.Mutation,
    ...bookResolvers.Mutation,
    ...genreResolvers.Mutation,
    ...reviewResolvers.Mutation,
  },
  // Type-specific resolvers
  Author: authorResolvers.Author,
  Book: bookResolvers.Book,
  Genre: genreResolvers.Genre,
  Review: reviewResolvers.Review,
};
