import prisma from '../db/prisma.js';

/**
 * Retrieves all authors from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of all authors.
 */
export const getAllAuthors = async () => {
  return await prisma.author.findMany();
};

/**
 * Creates a new author in the database.
 * @param {object} data - The data for the new author.
 * @param {string} data.name - The name of the author.
 * @param {boolean} [data.verified] - Whether the author is verified.
 * @returns {Promise<object>} A promise that resolves to the newly created author.
 */
export const createAuthor = async (data) => {
  return await prisma.author.create({
    data,
  });
};

/**
 * Finds an author by its ID.
 * @param {string} id - The ID of the author to find.
 * @returns {Promise<object|null>} A promise that resolves to the author or null if not found.
 */
export const getAuthorById = async (id) => {
  return await prisma.author.findUnique({
    where: { id },
  });
};

/**
 * Updates an author by its ID.
 * @param {string} id - The ID of the author to update.
 * @param {object} data - The data to update the author with.
 * @param {string} [data.name] - The name of the author.
 * @param {boolean} [data.verified] - Whether the author is verified.
 * @returns {Promise<object>} A promise that resolves to the updated author.
 */
export const updateAuthor = async (id, data) => {
  return await prisma.author.update({
    where: { id },
    data,
  });
};

/**
 * Deletes an author by its ID.
 * @param {string} id - The ID of the author to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted author.
 */
export const deleteAuthor = async (id) => {
  return await prisma.author.delete({
    where: { id },
  });
};

/**
 * Finds authors by their IDs.
 * @param {Array<string>} ids - The array of author IDs to find.
 * @returns {Promise<Array>} A promise that resolves to an array of authors.
 */
export const getAuthorsByIds = async (ids) => {
  return await prisma.author.findMany({
    where: { id: { in: ids } },
  });
};
