import { Notification } from '../models';
import { ForbiddenError } from 'apollo-server-express';

export default {
  Query: {
    notifications: (_, args, context) => {
      if (!context.user) {
        throw new ForbiddenError('No such user found.');
      }

      return Notification.find({"userId": context.user.id}).sort([['updatedAt', 'descending']]);
    },
    unReadNotifications: (_, args, context) => {
      if (!context.user) {
        throw new ForbiddenError('No such user found.');
      }

      return Notification.find({"userId": context.user.id, "read": false}).sort([['updatedAt', 'descending']]);
    },
  },
  Mutation: {
    createNotification: (_, args) => {
      return Notification.create(args.input);
    },
    readNotification: async (_, args) => {
      await Notification.updateMany({ _id: { $in: args.ids } }, { $set: { "read": true } });

      return Notification.find({ "_id": args.ids }).sort([['updatedAt', 'descending']]);
    },
  }
}
