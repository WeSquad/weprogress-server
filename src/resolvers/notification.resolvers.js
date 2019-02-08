import { Notification } from '../models';

export default {
  Query: {
    notifications: (_, args) => {
      return Notification.find({"userId": args.userId});
    },
    unReadNotifications: (_, args) => {
      return Notification.find({"userId": args.userId, "read": false});
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
