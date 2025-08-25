export const typeDefs = `#graphql
  # Represents a genre for books
  type Genre {
    id: ID!
    name: String!
    books: [Book!]
  }

  # Represents an author who can write reviews
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }

  # Represents a book, which belongs to a genre and can have reviews
  type Book {
    id: ID!
    title: String!
    description: String
    genre: Genre!
    reviews: [Review!]
  }

  # Represents a review for a book, written by an author
  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!
    book: Book!
  }

  # Entry points for querying data
  type Query {
    # Get a list of all genres
    genres: [Genre!]
    # Get a single genre by its ID
    genre(id: ID!): Genre
    # Get a list of all authors
    authors: [Author!]
    # Get a single author by their ID
    author(id: ID!): Author
    # Get a list of all books
    books: [Book!]
    # Get a single book by its ID
    book(id: ID!): Book
    # Get a list of all reviews
    reviews: [Review!]
    # Get a single review by its ID
    review(id: ID!): Review
  }

  # Entry points for modifying data
  type Mutation {
    # Create a new genre
    createGenre(name: String!): Genre!
    # Update an existing genre
    updateGenre(id: ID!, name: String): Genre
    # Delete a genre
    deleteGenre(id: ID!): Genre

    # Create a new author
    createAuthor(name: String!): Author!
    # Update an existing author
    updateAuthor(id: ID!, name: String, verified: Boolean): Author
    # Delete an author
    deleteAuthor(id: ID!): Author

    # Create a new book
    createBook(input: AddBookInput!): Book!
    # Update an existing book
    updateBook(id: ID!, input: EditBookInput!): Book
    # Delete a book
    deleteBook(id: ID!): Book

    # Create a new review
    createReview(input: AddReviewInput!): Review!
    # Update an existing review
    updateReview(id: ID!, input: EditReviewInput!): Review
    # Delete a review
    deleteReview(id: ID!): Review
  }

  # Input type for creating a new book
  input AddBookInput {
    title: String!
    description: String
    genreId: ID!
  }

  # Input type for updating an existing book
  input EditBookInput {
    title: String
    description: String
    genreId: ID
  }

  # Input type for creating a new review
  input AddReviewInput {
    rating: Int!
    content: String!
    authorId: ID!
    bookId: ID!
  }

  # Input type for updating an existing review
  input EditReviewInput {
    rating: Int
    content: String
  }
`;

export default typeDefs;
