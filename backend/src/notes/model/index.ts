import { Schema, model, ValidatorProps } from 'mongoose';
import validator from 'validator';
import { validateTags, validateUsers } from './validation';

const ObjectId = Schema.Types.ObjectId;

const NoteSchema = new Schema({
  users: {
    type: [{ type: ObjectId, ref: 'User' }],
    required: true,
  },
  title: {
    type: String,
    required: true,
    validate: {
      validator: (t: String) => {
        return validator.isLength(t as string, { min: 1, max: 100 });
      },
      message: (props: ValidatorProps) => `Title must have less than 100 characters, got ${props.value.length}`,
    },
  },
  body: String,
  tags: [{type: ObjectId, ref: 'Tag'}],
},{
  toObject: {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  },
  timestamps: {
    updatedAt: 'lastUpdate',
  }
});

// NoteSchema.pre('save', function(next) {

//   this.lastUpdate = new Date();
//   next();
// });


NoteSchema.pre('validate', validateUsers);
NoteSchema.pre('validate', validateTags);


const Note = model('Note', NoteSchema);
export default Note;
