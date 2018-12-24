import mongoose from 'mongoose';

/*
  Axe Model
*/

export const AxeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    skillsIds: [mongoose.Schema.Types.ObjectId]
  }
);

const Axe = mongoose.model('Axe', AxeSchema);

export default Axe;
