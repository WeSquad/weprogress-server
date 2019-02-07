import mongoose from 'mongoose';

/*
  User Model
  Mongoose will assign an ID by default to all schemas
*/

export const roles = { admin: 'admin', user: 'user' };

export const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: Object.keys(roles),
    default: roles.user
  },
  jobsIds: [mongoose.Schema.Types.ObjectId],
  mentorsIds: [mongoose.Schema.Types.ObjectId],
  menteesIds: [mongoose.Schema.Types.ObjectId]
});

const User = mongoose.model('User', UserSchema);

export default User;
