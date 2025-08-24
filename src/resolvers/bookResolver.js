import * as bookService from '../services/bookService.js';

/**
 * @description Resolvers for the Book type.
 */
export const bookResolvers = {
  Query: {
    books: async () => await bookService.getAllBooks(),
    book: async (_, { id }) => await bookService.getBookById(id),
  },
  Mutation: {
    createBook: async (_, { input }) => await bookService.createBook(input),
    updateBook: async (_, { id, input }) =>
      await bookService.updateBook(id, input),
    deleteBook: async (_, { id }) => await bookService.deleteBook(id),
  },
  Book: {
    /**
     * @description Resolver for fetching the genre of a book.
     */
    genre: async (parent, _, context) =>
      await context.loaders.genre.load(parent.genreId),
    /**
     * @description Resolver for fetching reviews for a book.
     */
    reviews: async (parent, _, context) =>
      await context.loaders.reviewsByBookId.load(parent.id),
  },
};
