import { Job, Axe } from '../models';
import { ApolloError } from 'apollo-server-express';

export default {
  Query: {
    jobs: async () => {
      return Job.find({});
    },
    job: async (_, args) => {
      return Job.findById(args.id);
    }
  },
  Mutation: {
    createJob: async (_, args) => {
      return Job.create(args.input).catch(function (err) {
        return new ApolloError(err.errmsg);
      })
    },
    updateJob: async (_, args) => {
      return Job.findOneAndUpdate(args.id, args.input, { new: true });
    },
    deleteJob: async (_, args) => {
      return Job.findByIdAndRemove(args.id);
    },
    addAxes: async (_, args) => {
      return Job.findByIdAndUpdate({ _id: args.id }, { $addToSet: { axesIds: args.axes } }, { new: true });
    },
    removeAxes: async (_, args) => {
      return Job.findByIdAndUpdate({ _id: args.id }, { $pull: { axesIds: { $in: args.axes } } }, { new: true });
    }
  },
  Job: {
    axes(job) {
      return Axe.find({ '_id': job.axesIds });
    }
  }
}
