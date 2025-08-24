import * as reviewService from '../services/reviewService.js';

/**
 * @description Resolvers for the Review type.
 */
export const reviewResolvers = {
  Query: {
    reviews: async () => await reviewService.getAllReviews(),
    review: async (_, { id }) => await reviewService.getReviewById(id),
  },
  Mutation: {
    createReview: async (_, { input }) =>
      await reviewService.createReview(input),
    updateReview: async (_, { id, input }) =>
      await reviewService.updateReview(id, input),
    deleteReview: async (_, { id }) => await reviewService.deleteReview(id),
  },
  Review: {
    author: async (parent, _, context) =>
      await context.loaders.author.load(parent.authorId),
    book: async (parent, _, context) =>
      await context.loaders.book.load(parent.bookId),
  },
};
