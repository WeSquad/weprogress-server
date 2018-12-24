import mongoose from 'mongoose';

/*
  Job Model
*/

export const JobSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    axesIds: [mongoose.Schema.Types.ObjectId]
  }
);

const Job = mongoose.model('Job', JobSchema);

export default Job;
