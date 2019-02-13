import { SharedAssessment, Assessment, User } from '../models';
import { adminValidate } from '../services';
import { ForbiddenError } from 'apollo-server-express';

export default {
  Query: {
    sharedAssessmentsTo: async (_, args, context) => {
      if (!context.user) {
        throw new ForbiddenError('No such user found.');
      }

      // Check if user has admin access
      const isAdmin = await adminValidate(context.user);

      if (!isAdmin) {
        return new ForbiddenError('Access restricted.');
      }

      return SharedAssessment.find({"toId": context.user.id});
    },
    sharedAssessment: async (_, args, context) => {
      if (!context.user) {
        throw new ForbiddenError('No such user found.');
      }

      let sharedAssement = await SharedAssessment.find({"id": args.id});

      if (context.user.id !== sharedAssement.toId) {
        throw new ForbiddenError();
      }

      return sharedAssement;
    }
  },
  Mutation: {
    createSharedAssessment: (_, args) => {
      return SharedAssessment.create(args.input);
    },
    updateSharedAssessment: (_, args) => {
      return SharedAssessment.findByIdAndUpdate({"_id": args.id}, args.input, { new: true });
    },
    deleteSharedAssessment: (_, args) => {
      return SharedAssessment.findByIdAndRemove(args.id);
    }
  },
  SharedAssessment: {
    assessment(sharedAssessment) {
      return Assessment.findById(sharedAssessment.assessmentId);
    },
    from(sharedAssessment) {
      return User.findById(sharedAssessment.fromId);
    },
    to(sharedAssessment) {
      return User.findById(sharedAssessment.toId);
    }
  }
}
