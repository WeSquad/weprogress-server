import { Assessment, User, Axe, Skill } from '../models';

export default {
  Query: {
    assessments: async () => {
      return Assessment.find({});
    },
    assessmentsByUser: async (_, args) => {
      return Assessment.find({
        'userId': args.id
      })
    },
    assessment: async (_, args) => {
      return Assessment.findById(args.id);
    }
  },
  Mutation: {
    createAssessment: async (_, args) => {
      return Assessment.create(args.input);
    },
    deleteAssessment: async (_, args) => {
      return Assessment.findByIdAndRemove(args.id);
    }
  },
  Assessment: {
    user(assessment) {
      return User.findById(assessment.userId);
    }
  },
  AssessmentSkill: {
    axe(assessmentSkill) {
      return Axe.findById(assessmentSkill.axeId);
    },
    skill(assessmentSkill) {
      return Skill.findById(assessmentSkill.skillId);
    }
  }
}
