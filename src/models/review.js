import prisma from '../db/prisma.js';

/**
 * Retrieves all reviews from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of all reviews.
 */
export const getAllReviews = async () => {
  return await prisma.review.findMany();
};

/**
 * Creates a new review in the database.
 * @param {object} data - The data for the new review.
 * @param {number} data.rating - The rating of the review (1-10).
 * @param {string} data.content - The content of the review.
 * @param {string} data.authorId - The ID of the author of the review.
 * @param {string} data.bookId - The ID of the book being reviewed.
 * @returns {Promise<object>} A promise that resolves to the newly created review.
 */
export const createReview = async (data) => {
  return await prisma.review.create({
    data,
  });
};

/**
 * Finds a review by its ID.
 * @param {string} id - The ID of the review to find.
 * @returns {Promise<object|null>} A promise that resolves to the review or null if not found.
 */
export const getReviewById = async (id) => {
  return await prisma.review.findUnique({
    where: { id },
  });
};

/**
 * Updates a review by its ID.
 * @param {string} id - The ID of the review to update.
 * @param {object} data - The data to update the review with.
 * @param {number} [data.rating] - The rating of the review (1-10).
 * @param {string} [data.content] - The content of the review.
 * @returns {Promise<object>} A promise that resolves to the updated review.
 */
export const updateReview = async (id, data) => {
  return await prisma.review.update({
    where: { id },
    data,
  });
};

/**
 * Deletes a review by its ID.
 * @param {string} id - The ID of the review to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted review.
 */
export const deleteReview = async (id) => {
  return await prisma.review.delete({
    where: { id },
  });
};

/**
 * Finds reviews by a list of book IDs.
 * @param {Array<string>} bookIds - The array of book IDs.
 * @returns {Promise<Array>} A promise that resolves to an array of reviews for the given book.
 */
export const getReviewsByBookIds = async (bookIds) => {
  return await prisma.review.findMany({
    where: { bookId: { in: bookIds } },
  });
};

/**
 * Finds reviews by a list of author IDs.
 * @param {Array<string>} authorIds - The array of author IDs.
 * @returns {Promise<Array>} A promise that resolves to an array of reviews by the given author.
 */
export const getReviewsByAuthorIds = async (authorIds) => {
  return await prisma.review.findMany({
    where: { authorId: { in: authorIds } },
  });
};
