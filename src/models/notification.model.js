import mongoose from 'mongoose';

/*
  Notification Model
*/

export const NotificationSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    message: {
      type: String,
      required: true,
      trim: true,
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;
