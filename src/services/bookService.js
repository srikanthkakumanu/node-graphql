import * as bookModel from '../models/book.js';

/**
 * Retrieves all books.
 * @returns {Promise<Array>} A promise that resolves to an array of all books.
 */
export const getAllBooks = async () => {
  return bookModel.getAllBooks();
};

/**
 * Retrieves a book by its ID.
 * @param {string} id - The ID of the book to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the book, or null if not found.
 */
export const getBookById = async (id) => {
  return bookModel.getBookById(id);
};

/**
 * Creates a new book.
 * @param {object} input - The book data.
 * @param {string} input.title - The title of the book.
 * @param {string} [input.description] - The description of the book.
 * @param {string} input.genreId - The ID of the genre.
 * @returns {Promise<object>} A promise that resolves to the newly created book.
 */
export const createBook = async (input) => {
  return bookModel.createBook(input);
};

/**
 * Updates an existing book.
 * @param {string} id - The ID of the book to update.
 * @param {object} input - The book data to update.
 * @param {string} [input.title] - The new title of the book.
 * @param {string} [input.description] - The new description of the book.
 * @param {string} [input.genreId] - The new genre ID for the book.
 * @returns {Promise<object>} A promise that resolves to the updated book.
 */
export const updateBook = async (id, input) => {
  return bookModel.updateBook(id, input);
};

/**
 * Deletes a book by its ID.
 * @param {string} id - The ID of the book to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted book.
 */
export const deleteBook = async (id) => {
  return bookModel.deleteBook(id);
};

/**
 * Retrieves books for multiple genres.
 * @param {Array<string>} genreIds - The array of genre IDs.
 * @returns {Promise<Array>} A promise that resolves to an array of books.
 */
export const getBooksByGenreIds = async (genreIds) => {
  return bookModel.getBooksByGenreIds(genreIds);
};

/**
 * Retrieves multiple books by their IDs.
 * @param {Array<string>} ids - The array of book IDs to retrieve.
 * @returns {Promise<Array>} A promise that resolves to an array of books.
 */
export const getBooksByIds = async (ids) => {
  return bookModel.getBooksByIds(ids);
};
