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
    },
    description: String,
    wishes: {
      training: {
        type: Boolean,
        default: false
      },
      interest: {
        type: Boolean,
        default: false
      },
      noMore: {
        type: Boolean,
        default: false
      }
    }
  }
);

const Skill = mongoose.model('Skill', SkillSchema);

export default Skill;
