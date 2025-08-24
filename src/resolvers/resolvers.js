import { authorResolvers } from './authorResolver.js';
import { bookResolvers } from './bookResolver.js';
import { genreResolvers } from './genreResolver.js';
import { reviewResolvers } from './reviewResolver.js';

/**
 * Merges multiple resolver objects into one.
 * This is a simple merge; for deep merging, a utility like lodash.merge would be better.
 * @param {Array<object>} resolversArray - An array of resolver objects.
 * @returns {object} The merged resolver object.
 */

export const resolvers = mergeResolvers([
  authorResolvers,
  bookResolvers,
  genreResolvers,
  reviewResolvers,
]);
