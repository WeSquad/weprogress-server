import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
  menteesIds: [mongoose.Schema.Types.ObjectId],
  password: {
    type: String,
    require: true
  },
  payloadId: mongoose.Schema.Types.ObjectId
});

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.pre('findOneAndUpdate', async function(next) {
  const updates = this.getUpdate();

  if (!this.getUpdate().password || this.getUpdate().password === null || this.getUpdate().password === '') {
    const { password, ...withOutPassword } = updates;
    this.setUpdate(withOutPassword);
    return next();
  }

  try {
    const newpassword = await bcrypt.hash(this.getUpdate().password, 10);
    this.setUpdate({ ...updates, password: newpassword });
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
