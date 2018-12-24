import Assessment from '../models/assessment.model';
import User from '../models/user.model';
import Axe from '../models/axe.model';
import Skill from '../models/skill.model';

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
