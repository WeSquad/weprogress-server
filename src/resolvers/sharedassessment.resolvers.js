import { SharedAssessment, Assessment, User } from '../models';
import { ForbiddenError, ValidationError } from 'apollo-server-express';

export default {
  Query: {
    sharedAssessmentsTo: async (_, args, context) => {
      if (!context.user) {
        throw new ForbiddenError('No such user found.');
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
    createSharedAssessment: async (_, args, context) => {
      let existingAssessment = await SharedAssessment.findOne({"toId": args.input.toId, "assessmentId": args.input.assessmentId});

      if (existingAssessment) {
        throw new ValidationError("Assessment déjà partagé avec cet utilisateur.")
      }

      if (context.user.id === args.input.toId) {
        throw new ForbiddenError("Impossible à partager avec vous-même");
      }

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
