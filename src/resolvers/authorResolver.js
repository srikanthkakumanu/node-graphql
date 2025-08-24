import * as authorService from '../services/authorService.js';

/**
 * @description Resolvers for the Author type.
 */
export const authorResolvers = {
  Query: {
    /**
     * @description Resolver for fetching all authors.
     */
    authors: async () => await authorService.getAllAuthors(),
    /**
     * @description Resolver for fetching a single author by ID.
     */
    author: async (_, { id }) => await authorService.getAuthorById(id),
  },
  Mutation: {
    createAuthor: async (_, { input }) =>
      await authorService.createAuthor(input),
    updateAuthor: async (_, { id, input }) =>
      await authorService.updateAuthor(id, input),
    deleteAuthor: async (_, { id }) => await authorService.deleteAuthor(id),
  },
  Author: {
    /**
     * @description Resolver for fetching reviews for an author.
     */
    reviews: async (parent, _, context) =>
      await context.loaders.reviewsByAuthorId.load(parent.id),
  },
};
