import * as genreService from '../services/genreService.js';

/**
 * @description Resolvers for the Genre type.
 */
export const genreResolvers = {
  Query: {
    genres: async () => await genreService.getAllGenres(),
    genre: async (_, { id }) => await genreService.getGenreById(id),
  },
  Mutation: {
    createGenre: async (_, { input }) => await genreService.createGenre(input),
    updateGenre: async (_, { id, input }) =>
      await genreService.updateGenre(id, input),
    deleteGenre: async (_, { id }) => await genreService.deleteGenre(id),
  },
  Genre: {
    /**
     * @description Resolver for fetching books for a genre.
     */
    books: async (parent, _, context) =>
      await context.loaders.booksByGenreId.load(parent.id),
  },
};
