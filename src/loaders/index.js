import DataLoader from 'dataloader';
import * as authorService from '../services/authorService.js';
import * as bookService from '../services/bookService.js';
import * as genreService from '../services/genreService.js';
import * as reviewService from '../services/reviewService.js';

// Helper to map results to the order of the keys for one-to-one relationships
const mapToKeys = (keys, results, keyField) => {
  const resultsMap = new Map(
    results.map((result) => [result[keyField], result])
  );
  return keys.map((key) => resultsMap.get(key) || null);
};

// Helper to group results for one-to-many relationships
const groupToKeys = (keys, results, keyField) => {
  const resultsMap = new Map(keys.map((key) => [key, []]));
  results.forEach((result) => {
    resultsMap.get(result[keyField])?.push(result);
  });
  return keys.map((key) => resultsMap.get(key));
};

/**
 * Creates a set of DataLoaders for a single request.
 * @returns {object} An object containing all the DataLoaders.
 */
export const createLoaders = () => ({
  author: new DataLoader(async (ids) => {
    const authors = await authorService.getAuthorsByIds(ids);
    return mapToKeys(ids, authors, 'id');
  }),
  book: new DataLoader(async (ids) => {
    const books = await bookService.getBooksByIds(ids);
    return mapToKeys(ids, books, 'id');
  }),
  genre: new DataLoader(async (ids) => {
    const genres = await genreService.getGenresByIds(ids);
    return mapToKeys(ids, genres, 'id');
  }),
  reviewsByBookId: new DataLoader(async (bookIds) => {
    const reviews = await reviewService.getReviewsByBookIds(bookIds);
    return groupToKeys(bookIds, reviews, 'bookId');
  }),
  reviewsByAuthorId: new DataLoader(async (authorIds) => {
    const reviews = await reviewService.getReviewsByAuthorIds(authorIds);
    return groupToKeys(authorIds, reviews, 'authorId');
  }),
  booksByGenreId: new DataLoader(async (genreIds) => {
    const books = await bookService.getBooksByGenreIds(genreIds);
    return groupToKeys(genreIds, books, 'genreId');
  }),
});
