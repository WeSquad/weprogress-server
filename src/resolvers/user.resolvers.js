require('dotenv').config();

import { User, Job } from '../models';
import { AuthenticationError, UserInputError, ForbiddenError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { adminValidate } from '../services';

export default {
  Query: {
    users: async () => {
      return User.find({});
    },
    user: async (_, args) => {
      return User.findById(args.id);
    },
    me: async (_, args, context) => {
      if (!context.user) {
        throw new UserInputError('No such user found.');
      }

      return context.user;
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
    addJobs: async (_, args) => {
      return User.findByIdAndUpdate({ _id: args.id }, { $addToSet: { jobsIds: args.jobs } }, { new: true })
    },
    removeJobs: async (_, args) => {
      return User.findByIdAndUpdate({ _id: args.id }, { $pull: { jobsIds: { $in: args.jobs } } }, { new: true })
    },
    register: async (_, args) => {
      const user = User.create(args.input);
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, { expiresIn: '7d' });

      return {
        token,
        user,
      }
    },
    login: async (_, args) => {
      const user = await User.findOne({"email": args.email});
      if (!user) {
        throw new UserInputError('No such user found.');
      }

      const valid = await user.validatePassword(args.password);
      if (!valid) {
        throw new AuthenticationError('Invalid password.');
      }

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, { expiresIn: '7d' });

      return {
        token,
        user,
      }
    }
  },
  User: {
    jobs(user) {
      return Job.find({ '_id': { $in: user.jobsIds }});
    },
    fullName(user) {
      return `${user.firstName} ${user.lastName}`;
    }
  }
}
