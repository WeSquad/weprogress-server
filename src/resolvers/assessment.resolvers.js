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
    },
    assessmentRates: async (_, args) => {
      let result = await Assessment.findById(args.id);

      var axes = [];

      await Promise.all(result.axes.map(async (axeArray) => {
        let axe = await Axe.findById(axeArray.axeId);
        var skillsCount = 0;
        axeArray.skills.map(skill => {
          skillsCount = skillsCount + skill.skillRate;
        });

        var axeRate = {
          "name": axe.name,
          "skillsTotal": axeArray.skills.length * 4,
          "skillsCount": skillsCount,
          "axePourcent": (skillsCount / (axeArray.skills.length * 4)) * 100
        };

        axes.push(axeRate);
      }));

      return axes;
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
  AssessmentAxe: {
    axe(assessmentAxe) {
      return Axe.findById(assessmentAxe.axeId);
    }
  },
  AssessmentSkill: {
    skill(assessmentSkill) {
      return Skill.findById(assessmentSkill.skillId);
    }
  }
}
