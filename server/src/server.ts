import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authenticateToken } from './services/auth-service.js';
import db from './config/connection.js';

// Import typeDefs and resolvers
import { typeDefs, resolvers } from './schemas/index.js';

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

const startApolloServer = async () => {
  await server.start();
  await db;

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Apply Apollo Middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authenticateToken, // Ensures context includes the user token
    })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();