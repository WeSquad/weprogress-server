import mongoose from 'mongoose';

/*
  Assessment Model
*/

export const AssessmentSchema = mongoose.Schema(
  {
    rate: Number
  },
  {
    timestamps: true
  });

const Assessment = mongoose.model('Assessment', AssessmentSchema);

export default Assessment;