import * as authorModel from '../models/author.js';

/**
 * Retrieves all authors.
 * @returns {Promise<Array>} A promise that resolves to an array of all authors.
 */
export const getAllAuthors = async () => {
  return authorModel.getAllAuthors();
};

/**
 * Retrieves an author by their ID.
 * @param {string} id - The ID of the author to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the author, or null if not found.
 */
export const getAuthorById = async (id) => {
  return authorModel.getAuthorById(id);
};

/**
 * Creates a new author.
 * @param {object} input - The author data.
 * @param {string} input.name - The name of the author.
 * @param {boolean} [input.verified] - The verification status of the author.
 * @returns {Promise<object>} A promise that resolves to the newly created author.
 */
export const createAuthor = async (input) => {
  return authorModel.createAuthor(input);
};

/**
 * Updates an existing author.
 * @param {string} id - The ID of the author to update.
 * @param {object} input - The author data to update.
 * @param {string} [input.name] - The new name of the author.
 * @param {boolean} [input.verified] - The new verification status of the author.
 * @returns {Promise<object>} A promise that resolves to the updated author.
 */
export const updateAuthor = async (id, input) => {
  return authorModel.updateAuthor(id, input);
};

/**
 * Deletes an author by their ID.
 * @param {string} id - The ID of the author to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted author.
 */
export const deleteAuthor = async (id) => {
  return authorModel.deleteAuthor(id);
};

/**
 * Retrieves multiple authors by their IDs.
 * @param {Array<string>} ids - The array of author IDs to retrieve.
 * @returns {Promise<Array>} A promise that resolves to an array of authors.
 */
export const getAuthorsByIds = async (ids) => {
  return authorModel.getAuthorsByIds(ids);
};
