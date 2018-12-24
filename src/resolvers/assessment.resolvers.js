import Assessment from '../models/assessment.model';

export default {
  Query: {
    assessments: async () => {
      return Assessment.find({});
    },
    assessment: async (_, args) => {
      return Assessment.findById(args.id);
    }
  },
  Mutation: {
    createAssessment: async (_, args) => {
      return Assessment.create(args.input);
    }
  },
  Assessment: {
    createdAt(assessment) {
      return assessment.createdAt;
    }
  }
}
