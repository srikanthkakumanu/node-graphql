import * as reviewModel from '../models/review.js';

/**
 * Retrieves all reviews.
 * @returns {Promise<Array>} A promise that resolves to an array of all reviews.
 */
export const getAllReviews = async () => {
  return reviewModel.getAllReviews();
};

/**
 * Retrieves a review by its ID.
 * @param {string} id - The ID of the review to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the review, or null if not found.
 */
export const getReviewById = async (id) => {
  return reviewModel.getReviewById(id);
};

/**
 * Creates a new review.
 * @param {object} input - The review data.
 * @param {number} input.rating - The rating of the review.
 * @param {string} input.content - The content of the review.
 * @param {string} input.authorId - The ID of the author.
 * @param {string} input.bookId - The ID of the book.
 * @returns {Promise<object>} A promise that resolves to the newly created review.
 */
export const createReview = async (input) => {
  return reviewModel.createReview(input);
};

/**
 * Updates an existing review.
 * @param {string} id - The ID of the review to update.
 * @param {object} input - The review data to update.
 * @param {number} [input.rating] - The new rating for the review.
 * @param {string} [input.content] - The new content for the review.
 * @returns {Promise<object>} A promise that resolves to the updated review.
 */
export const updateReview = async (id, input) => {
  return reviewModel.updateReview(id, input);
};

/**
 * Deletes a review by its ID.
 * @param {string} id - The ID of the review to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted review.
 */
export const deleteReview = async (id) => {
  return reviewModel.deleteReview(id);
};

/**
 * Retrieves reviews for multiple books.
 * @param {Array<string>} bookIds - The array of book IDs.
 * @returns {Promise<Array>} A promise that resolves to an array of reviews.
 */
export const getReviewsByBookIds = async (bookIds) => {
  return reviewModel.getReviewsByBookIds(bookIds);
};

/**
 * Retrieves reviews by multiple authors.
 * @param {Array<string>} authorIds - The array of author IDs.
 * @returns {Promise<Array>} A promise that resolves to an array of reviews.
 */
export const getReviewsByAuthorIds = async (authorIds) => {
  return reviewModel.getReviewsByAuthorIds(authorIds);
};
