import mongoose from 'mongoose';

/*
  SharedAssessment Model
*/

export const SharedAssessmentSchema = mongoose.Schema(
  {
    fromId: mongoose.Schema.Types.ObjectId,
    toId: mongoose.Schema.Types.ObjectId,
    assessmentId: mongoose.Schema.Types.ObjectId,
    comments: String
  },
  {
    timestamps: true
  });

const SharedAssessment = mongoose.model('SharedAssessment', SharedAssessmentSchema);

export default SharedAssessment;
