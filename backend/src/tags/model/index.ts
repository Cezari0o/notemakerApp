import { model, Schema } from "mongoose";
import { validateUser } from "./validation";

const ObjectId = Schema.Types.ObjectId;

const TagSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
}, {
  toObject: {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  }
});

TagSchema.pre('save', function (next) {
  this.lastUpdate = new Date();
  next();
});

TagSchema.pre('validate', validateUser);

const Tag = model('Tag', TagSchema);

export default Tag;