import Axe from '../models/axe.model';
import Skill from '../models/skill.model';
import { ApolloError } from 'apollo-server-hapi';

export default {
  Query: {
    axes: async () => {
      return Axe.find({});
    }
  },
  Mutation: {
    createAxe: async (_, args) => {
      return Axe.create(args.input).catch(function (err) {
        return new ApolloError(err.errmsg);
      })
    },
    updateAxe: async (_, args) => {
      return Axe.findOneAndUpdate(args.id, args.input, { new: true });
    },
    deleteAxe: async (_, args) => {
      return Axe.findByIdAndRemove(args.id);
    },
    addSkills: async (_, args) => {
      return Axe.findByIdAndUpdate({ _id: args.id }, { $addToSet: { skillsIds: args.skills } }, { new: true })
    },
    removeSkills: async (_, args) => {
      return Axe.findByIdAndUpdate({ _id: args.id }, { $pull: { skillsIds: { $in: args.skills } } }, { new: true })
    }
  },
  Axe: {
    skills(axe) {
      return Skill.find({ '_id': axe.skillsIds });
    }
  }
}
