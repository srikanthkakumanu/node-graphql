
import prisma from '../db/prisma.js';

/**

 * Retrieves all genres from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of all genres.
 */
export const getAllGenres = async () => {
  console.log('Retrieving all genres from the database.');
  return prisma.genre.findMany();
};

/**
 * Creates a new genre in the database.
 * @param {object} data - The data for the new genre.
 * @param {string} data.name - The name of the genre.
 * @returns {Promise<object>} A promise that resolves to the newly created genre.
 */
export const createGenre = async (data) => {
  console.log(`Creating a new genre with data: ${JSON.stringify(data)}`);
  return prisma.genre.create({
    data,
  });
};

/**
 * Finds a genre by its ID.
 * @param {string} id - The ID of the genre to find.
 * @returns {Effect.Effect<object|null, DatabaseError>} An effect that resolves to the genre or null if not found.
 */
export const getGenreById = (id) =>
  Effect.logInfo(`Finding genre with ID: ${id}`).pipe(
    Effect.andThen(() =>
      Effect.tryPromise({
        try: () => prisma.genre.findUnique({ where: { id } }),
        catch: (error) => new DatabaseError(error),
      })
    )
  );

/**
 * Updates a genre by its ID.
 * @param {string} id - The ID of the genre to update.
 * @returns {Promise<object|null>} A promise that resolves to the genre or null if not found.
 * @returns {Promise<object>} A promise that resolves to the updated genre.
export const getGenreById = async (id) => {
  console.log(`Finding genre with ID: ${id}`);
  return prisma.genre.findUnique({
    where: { id },
  });
};
/**
 * Deletes a genre by its ID.
 * @param {string} id - The ID of the genre to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted genre.
 */
export const deleteGenre = async (id) => {
  console.log(`Deleting genre with ID: ${id}`);
  return prisma.genre.delete({
    where: { id },
  });
};

/**
 * Finds genres by their IDs.
 * @param {Array<string>} ids - The array of genre IDs to find.
 * @returns {Promise<Array>} A promise that resolves to an array of genres.
 */
export const getGenresByIds = async (ids) => {
  console.log(`Finding genres with IDs: ${ids.join(', ')}`);
  return prisma.genre.findMany({
    where: { id: { in: ids } },
  });
};
