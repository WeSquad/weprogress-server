import User from '../models/user.model';
import Job from '../models/job.model';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';

export default {
  Query: {
    users: async () => {
      return User.find({});
    },
    user: async (_, args) => {
      return User.findById(args.id);
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      return User.create(args.input);
    },
    updateUser: async (_, args) => {
      return User.findOneAndUpdate(args.id, args.input, { new: true });
    },
    assignJob: async (_, args) => {
      return User.findOneAndUpdate(args.id, {
        "jobId": mongoose.Types.ObjectId(args.jobId)
      }, { new: true });
    },
    register: async (_, args) => {
      const password = await bcrypt.hash(args.input.password, 10);

      const user = User.create({
        "firstName": args.input.firstName,
        "lastName": args.input.lastName,
        "email": args.input.email,
        "password": password
      });

      const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '7d' });

      return {
        token,
        user,
      };
    },
    login: async (_, args) => {
      const user = await User.findOne({"email": args.email});
      if (!user) {
        throw new Error('No such user found')
      }

      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }

      const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '7d' })

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
