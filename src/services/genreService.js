import * as genreModel from '../models/genre.js';
import { NotFoundError } from '../middleware/errors/errors.js';

/**
 * Retrieves all genres.
 * @returns {Promise<Array>} A promise that resolves to an array of all genres.
 */
export const getAllGenres = async () => {
  return genreModel.getAllGenres();
};

/**
 * Retrieves a genre by its ID.
 * @param {string} id - The ID of the genre to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the genre, or null if not found.
 * @throws {NotFoundError} If the genre is not found.
 */
export const getGenreById = async (id) => {
  const genre = await genreModel.getGenreById(id);
  if (!genre) {
    throw new NotFoundError(`Genre with ID ${id} not found.`);
  }
  return genre;
};

/**
 * Creates a new genre.
 * @param {object} input - The genre data.
 * @param {string} input.name - The name of the genre.
 * @returns {Promise<object>} A promise that resolves to the newly created genre.
 */
export const createGenre = async (input) => {
  return genreModel.createGenre(input);
};

/**
 * Updates an existing genre.
 * @param {string} id - The ID of the genre to update.
 * @param {object} input - The genre data to update.
 * @param {string} [input.name] - The new name of the genre.
 * @returns {Promise<object>} A promise that resolves to the updated genre.
 */
export const updateGenre = async (id, input) => {
  return genreModel.updateGenre(id, input);
};

/**
 * Deletes a genre by its ID.
 * @param {string} id - The ID of the genre to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted genre.
 */
export const deleteGenre = async (id) => {
  return genreModel.deleteGenre(id);
};

/**
 * Retrieves multiple genres by their IDs.
 * @param {Array<string>} ids - The array of genre IDs to retrieve.
 * @returns {Promise<Array>} A promise that resolves to an array of genres.
 */
export const getGenresByIds = async (ids) => {
  return genreModel.getGenresByIds(ids);
};
