import { Skill } from '../models';
import { ApolloError } from 'apollo-server-express';

export default {
  Query: {
    skills: async () => {
      return Skill.find({});
    }
  },
  Mutation: {
    createSkill: async (_, args) => {
      return Skill.create(args.input).catch(function (err) {
        return new ApolloError(err.errmsg);
      })
    },
    updateSkill: async (_, args) => {
      return Skill.findOneAndUpdate(args.id, args.input, { new: true });
    },
    deleteSkill: async (_, args) => {
      return Skill.findByIdAndRemove(args.id);
    }
  }
}
