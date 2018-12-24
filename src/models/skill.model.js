import mongoose from 'mongoose';

/*
  Skill Model
*/

export const SkillSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    multiplier: {
      type: Number,
      default: 1
    }
  }
);

const Skill = mongoose.model('Skill', SkillSchema);

export default Skill;
