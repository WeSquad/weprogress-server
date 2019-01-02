require('dotenv').config();

import express from 'express';
import { ApolloServer, ForbiddenError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import mongodb from './db/index';
import { User } from './models';

import resolvers from './resolvers';
import types from './types';

mongodb();
const app = express();

const apolloServer = new ApolloServer({
  typeDefs: types,
  resolvers: resolvers,
  context: async ({ req }) => {
    var user = null;

    if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      try {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        user = await User.findById(userId).exec();
      } catch (err) {
        throw new ForbiddenError('Invalid Token, please renew it.');
      }
    }

    return {
      user: user
    }
  }
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const port = 4000;

app.listen({ port: port }, () => {
  console.log(`🚀 Server running at: http://localhost:${port}/`)
});
