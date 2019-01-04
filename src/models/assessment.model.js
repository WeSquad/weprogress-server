import mongoose from 'mongoose';

/*
  Assessment Model
*/

export const AssessmentSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    axes: [
      {
        axeId: mongoose.Schema.Types.ObjectId,
        skills: [
          {
            skillId: mongoose.Schema.Types.ObjectId,
            skillRate: Number
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  });

const Assessment = mongoose.model('Assessment', AssessmentSchema);

export default Assessment;
