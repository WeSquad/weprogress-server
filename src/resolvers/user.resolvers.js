require('dotenv').config();

import { User, Job } from '../models';
import { AuthenticationError, UserInputError, ForbiddenError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { adminValidate } from '../services';

export default {
  Query: {
    users: async (_, args, context) => {
      return User.find({});
    },
    user: async (_, args) => {
      return User.findById(args.id);
    }
  },
  Mutation: {
    createUser: async (_, args, context) => {
      // Check if user has admin access
      const isAdmin = await adminValidate(context.user);

      if (!isAdmin) {
        return new ForbiddenError('Access restricted.');
      }

      return User.create(args.input);
    },
    updateUser: async (_, args) => {
      return User.findOneAndUpdate(args.id, args.input, { new: true });
    },
    assignJob: async (_, args) => {
      return User.findOneAndUpdate(args.id, {
        "jobId": args.jobId
      }, { new: true });
    },
    register: async (_, args) => {
      const user = User.create(args.input);
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, { expiresIn: '7d' });

      return {
        token,
        user,
      };
    },
    login: async (_, args) => {
      const user = await User.findOne({"email": args.email});
      if (!user) {
        throw new UserInputError('No such user found')
      }

      const valid = await user.validatePassword(args.password);
      if (!valid) {
        throw new AuthenticationError('Invalid password')
      }

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, { expiresIn: '7d' })

      return {
        token,
        user,
      }
    }
  },
  User: {
    job(user) {
      return Job.findById(user.jobId);
    }
  }
}
