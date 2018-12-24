import mongoose from 'mongoose';

/*
  Assessment Model
*/

export const AssessmentSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    assessmentSkills: [
      {
        skillId: mongoose.Schema.Types.ObjectId,
        skillRate: Number,
        axeId: mongoose.Schema.Types.ObjectId
      }
    ]
  },
  {
    timestamps: true
  });

const Assessment = mongoose.model('Assessment', AssessmentSchema);

export default Assessment;
