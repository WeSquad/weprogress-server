require('dotenv').config();

import { User, Job } from '../models';
import { UserInputError, ForbiddenError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { adminValidate } from '../services';
import { OAuth2Client } from 'google-auth-library';

export default {
  Query: {
    users: async () => {
      return User.find({});
    },
    user: async (_, args) => {
      return User.findById(args.id);
    },
    me: async (_, args, context) => {
      if (!context.user) {
        throw new ForbiddenError('No such user found.');
      }

      return context.user;
    }
  },
  Mutation: {
    createUser: async (_, args, context) => {
      // Check if user has admin access
      const isAdmin = await adminValidate(context.user);

      if (!isAdmin) {
        return new ForbiddenError('Access restricted.');
      }

      return User.create(args.input);
    },
    updateUser: async (_, args, context) => {
      if (!context.user) {
        throw new UserInputError('No such user found.');
      }

      if (context.user.id !== args.id && context.user.role !== 'admin') {
        throw new ForbiddenError('Forbidden.');
      }

      return User.findOneAndUpdate({ _id: args.id }, args.input, { new: true });
    },
    addJobs: async (_, args) => {
      return User.findByIdAndUpdate({ _id: args.id }, { $addToSet: { jobsIds: args.jobs } }, { new: true });
    },
    removeJobs: async (_, args) => {
      return User.findByIdAndUpdate({ _id: args.id }, { $pull: { jobsIds: { $in: args.jobs } } }, { new: true });
    },
    setJobs: async (_, args) => {
      return User.findOneAndUpdate({ _id: args.id }, { $set: { 'jobsIds': args.jobsIds } }, { new: true });
    },
    addMentor: async (_, args) => {
      const mentor = await User.findByIdAndUpdate({ _id: args.mentorId }, { $addToSet: { menteesIds: args.id } }, { new: true });
      return User.findByIdAndUpdate({ _id: args.id }, { $addToSet: { mentorsIds: args.mentorId } }, { new: true });
    },
    removeMentor: async (_, args) => {
      const mentor = await User.findByIdAndUpdate({ _id: args.mentorId }, { $pull: { menteesIds: { $in: args.id } } }, { new: true });
      return User.findByIdAndUpdate({ _id: args.id }, { $pull: { mentorsIds: { $in: args.mentorId } } }, { new: true });
    },
    glogin: async (_, args) => {
      const gclient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await gclient.verifyIdToken({
        idToken: args.token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      // Only Wemanity is authorize
      /*
      if (payload["hd"] !== "wemanity.com") {
        throw new ForbiddenError('Only wemanity is allowed to use WeProgress.');
      }*/

      var user = await User.findOne({"email": payload["email"]});

      if (!user) {
        user = await User.create({
          email: payload["email"],
          firstName: payload["given_name"],
          lastName: payload["family_name"],
          picture: payload["picture"]? payload["picture"] : ""
        });
      }

      // To improve : use google exp as expirein of the jwt
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, { expiresIn: "30d" });

      return {
        token,
        user,
      }
    }
  },
  User: {
    jobs(user) {
      return Job.find({ '_id': { $in: user.jobsIds }});
    },
    fullName(user) {
      return `${user.firstName} ${user.lastName}`;
    },
    mentors(user) {
      return User.find({ '_id': { $in: user.mentorsIds }});
    },
    mentees(user) {
      return User.find({ '_id': { $in: user.menteesIds }});
    }
  }
}
