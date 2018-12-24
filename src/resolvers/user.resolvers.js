import User from '../models/user.model';
import Job from '../models/job.model';
import mongoose from 'mongoose';

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
    }
  },
  User: {
    job(user) {
      return Job.findById(user.jobId);
    }
  }
}
