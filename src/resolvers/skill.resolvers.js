import Skill from '../models/skill.model';
import { ApolloError } from 'apollo-server-hapi';

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
