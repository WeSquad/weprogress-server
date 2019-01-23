import { Assessment, User, Axe, Skill } from '../models';
import { ApolloError } from 'apollo-server-core';
import { GraphQLScalarType, Kind } from 'graphql';

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    assessments: async () => {
      return Assessment.find({});
    },
    assessmentsByUser: async (_, args) => {
      const assessments = Assessment.find({
        'userId': args.userId
      })
      .sort({'updatedAt': -1});

      if (args.limit) {
        assessments.limit(args.limit);
      }

      return assessments;
    },
    assessment: async (_, args) => {
      return Assessment.findById(args.id);
    },
    assessmentRates: async (_, args) => {
      let result = await Assessment.findById(args.id);

      if (!result) {
        throw new ApolloError('Assessment not found.', 'NOT_FOUND');
      }

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
