import { model, Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const TagSchema = new Schema({
  title: String,
  userId: {
    type: ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
  },
});

TagSchema.pre('save', function (next) {
  this.lastUpdate = new Date();
  next();
});

const Tag = model('Tag', TagSchema);

export default Tag;