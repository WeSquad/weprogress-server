import mongoose from 'mongoose';

/*
  Axe Model
*/

export const axesTypes = { softSkills: 'softSkills', hardSkills: 'hardSkills', wemanity: 'wemanity' };

export const AxeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    skillsIds: [mongoose.Schema.Types.ObjectId],
    type: {
      type: String,
      enum: Object.keys(axesTypes),
    },
  }
);

const Axe = mongoose.model('Axe', AxeSchema);

export default Axe;
