import mongoose from 'mongoose';

const trackingSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true
    },
    createdDate: {
      type: String,
      required: true
    },
    updatedDate: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

const scoreSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    player_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 12
    },
    score_rank: {
      type: Number
    },
    time_seconds: {
      type: Number,
      required: true,
      min: 1
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard', 'evil']
    },
    puzzle_seed: {
      type: String,
      required: true
    },
    mistakes: {
      type: Number,
      default: 0,
      min: 0
    },
    hints_used: {
      type: Number,
      default: 0,
      min: 0
    },
    tracking: {
      type: trackingSchema,
      required: true
    }
  },
  { versionKey: false }
);

export default mongoose.model('Score', scoreSchema);