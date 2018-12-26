import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import connect from './db/index';

import resolvers from './resolvers';
import types from './types';

connect();

const app = express();

const apolloServer = new ApolloServer({
  typeDefs: types,
  resolvers: resolvers
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const port = 4000;

app.listen({ port: port }, () => {
  console.log(`🚀 Server running at: http://localhost:${port}/`)
});
