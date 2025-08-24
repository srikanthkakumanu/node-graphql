import prisma from '../db/prisma.js';

/**
 * Retrieves all books from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of all books.
 */
export const getAllBooks = async () => {
  return await prisma.book.findMany();
};

/**
 * Creates a new book in the database.
 * @param {object} data - The data for the new book.
 * @param {string} data.title - The title of the book.
 * @param {string} [data.description] - The description of the book.
 * @param {string} data.genreId - The ID of the genre this book belongs to.
 * @returns {Promise<object>} A promise that resolves to the newly created book.
 */
export const createBook = async (data) => {
  return await prisma.book.create({
    data,
  });
};

/**
 * Finds a book by its ID.
 * @param {string} id - The ID of the book to find.
 * @returns {Promise<object|null>} A promise that resolves to the book or null if not found.
 */
export const getBookById = async (id) => {
  return await prisma.book.findUnique({
    where: { id },
  });
};

/**
 * Updates a book by its ID.
 * @param {string} id - The ID of the book to update.
 * @param {object} data - The data to update the book with.
 * @param {string} [data.title] - The title of the book.
 * @param {string} [data.description] - The description of the book.
 * @param {string} [data.genreId] - The ID of the genre this book belongs to.
 * @returns {Promise<object>} A promise that resolves to the updated book.
 */
export const updateBook = async (id, data) => {
  return await prisma.book.update({
    where: { id },
    data,
  });
};

/**
 * Deletes a book by its ID.
 * @param {string} id - The ID of the book to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted book.
 */
export const deleteBook = async (id) => {
  return await prisma.book.delete({
    where: { id },
  });
};

/**
 * Finds books by a list of genre IDs.
 * @param {Array<string>} genreIds - The array of genre IDs.
 * @returns {Promise<Array>} A promise that resolves to an array of books for the given genre.
 */
export const getBooksByGenreIds = async (genreIds) => {
  return await prisma.book.findMany({
    where: { genreId: { in: genreIds } },
  });
};

/**
 * Finds books by their IDs.
 * @param {Array<string>} ids - The array of book IDs to find.
 * @returns {Promise<Array>} A promise that resolves to an array of books.
 */
export const getBooksByIds = async (ids) => {
  return await prisma.book.findMany({
    where: { id: { in: ids } },
  });
};
