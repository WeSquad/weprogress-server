import { Notification } from '../models';
import { ForbiddenError } from 'apollo-server-express';

export default {
  Query: {
    notifications: (_, args, context) => {
      if (!context.user) {
        throw new ForbiddenError('No such user found.');
      }

      return Notification.find({"userId": context.user.id});
    },
    unReadNotifications: (_, args, context) => {
      if (!context.user) {
        throw new ForbiddenError('No such user found.');
      }

      return Notification.find({"userId": context.user.id, "read": false});
    },
  },
  Mutation: {
    createNotification: (_, args) => {
      return Notification.create(args.input);
    },
    readNotification: (_, args) => {
      return Notification.findOneAndUpdate({ _id: args.id }, {"read": true}, { new: true });
    },
  }
}
