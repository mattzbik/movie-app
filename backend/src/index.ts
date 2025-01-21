import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import { AppDataSource } from './data-source';
import { MovieResolver } from './resolvers/movie';

interface MyContext {
  token?: string;
}

const main = async () => {
  await AppDataSource.initialize()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Error during Data Source initialization:', err);
    });

  const PORT = process.env.PORT || 4000;
  const app = express();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [MovieResolver],
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${PORT}/grapqhl`);
};

main();
