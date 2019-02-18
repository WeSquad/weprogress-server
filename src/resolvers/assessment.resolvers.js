import { Assessment, User, Axe, Skill, Job } from '../models';
import { ApolloError } from 'apollo-server-core';
import { ForbiddenError, ValidationError } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import bson from 'bson';

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
  BsonID: new GraphQLScalarType({
    name: 'BsonID',
    description: 'ID custom scalar type for non _id fields',
    serialize: String,
    parseValue(value) {
      const objectidPattern = "/^[0-9a-fA-F]{24}$/";

      if (objectidPattern.test(value)) {
        return bson.ObjectId(value);
      }

      throw new Error('ObjectId must be a single String of 24 hex characters');
    },
    parseLiteral(ast) {
      const objectidPattern = /^[0-9a-fA-F]{24}$/;

      if (objectidPattern.test(ast.value)) {
        return bson.ObjectId(ast.value);
      }

      throw new Error('ObjectId must be a single String of 24 hex characters');
    },
  }),
  Query: {
    assessments: async () => {
      return Assessment.find({});
    },
    myAssessments: (_, args, context) => {
      if (!context.user) {
        throw new ForbiddenError('No such user found.');
      }

      const assessments = Assessment.find({
        'userId': context.user.id
      })
      .sort({'updatedAt': -1});

      if (args.limit) {
        assessments.limit(args.limit);
      }

      return assessments;
    },
    assessmentsByUser: (_, args) => {
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
    updateAssessment: async (_, args) => {
      return Assessment.findByIdAndUpdate({"_id": args.id}, args.input, { new: true });
    },
    deleteAssessment: async (_, args) => {
      return Assessment.findByIdAndRemove(args.id);
    }
  },
  Assessment: {
    user(assessment) {
      return User.findById(assessment.userId);
    },
    job(assessment) {
      return Job.findById(assessment.jobId);
    }
  },
  AssessmentAxe: {
    async axeName(assessmentAxe) {
      let axe = await Axe.findById(assessmentAxe.axeId);

      return axe.name;
    }
  },
  AssessmentSkill: {
    async skillName(assessmentSkill) {
      let skill = await Skill.findById(assessmentSkill.skillId);

      return skill.name;
    }
  }
}
