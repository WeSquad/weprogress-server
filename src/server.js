import hapi from 'hapi';
import { ApolloServer } from 'apollo-server-hapi';

import connect from './db/index';

import resolvers from './resolvers';
import types from './types';

export const start = async () => {
  await connect();

  const apolloServer = new ApolloServer({
    typeDefs: types,
    resolvers: resolvers
  });

  const server = hapi.server({
    port: 4000,
    host: 'localhost'
  });

  await apolloServer.applyMiddleware({ app: server });
  await apolloServer.installSubscriptionHandlers(server.listener);
  await server.start();

  console.log(`🚀 Server running at: ${server.info.uri}`);
};
