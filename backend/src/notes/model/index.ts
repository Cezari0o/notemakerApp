import mongoose, { Schema, Types, model } from 'mongoose';
import validator from 'validator';

const ObjectId = Types.ObjectId;

const NoteSchema = new Schema({
  user: {
    type: ObjectId,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
    validate: {
      validator: (t: String) => {
        return validator.isLength(t as string, { min: 1, max: 100 });
      },
      message: props => `Title must have less than 100 characters, got ${props.value.length}`,
    },
  },
  body: String,
  tags: [ObjectId],
  createdAt: Date,
  lastUpdate: Date,
});

const Note = model('Note', NoteSchema);

export default Note;
