import { initOpenTelemetry } from './middleware/telemetry/opentelemetry.js';
// Initialize OpenTelemetry. This must be done before any other modules are imported.
initOpenTelemetry();

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './resolvers/resolvers.js';
import { formatError } from './middleware/errors/errorHandler.js';
import { logger } from './middleware/logging/logger.js';
import { createLoaders } from './loaders/index.js';
import 'dotenv/config'; // Load environment variables from .env file if present
/**
 * The main entry point for the GraphQL API.
 * This file sets up and starts the Apollo Server.
 */

// Create a new instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
});

const PORT = process.env.PORT || 3333;

// Start the standalone server, passing a context function to add
// middleware-like functionality and our DataLoaders.
const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req }) => {
    // Instantiate new DataLoaders for each request
    const loaders = createLoaders();

    // Log the incoming operation if it has a name
    if (req.body.operationName) {
      logger.info(`Processing operation: ${req.body.operationName}`);
    }

    // You can add anything to the context here, like user authentication data
    // from a token, or other services that resolvers might need.
    return { logger, loaders };
  },
});

console.log(`🚀 Server ready at: ${url}`);
