import { Schema, model, ValidatorProps } from 'mongoose';
import validator from 'validator';
import Tag from '../../tags/model';
import User from '../../users/model';

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  }
},{
  toObject: {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  }
});

NoteSchema.pre('save', function(next) {

  this.lastUpdate = new Date();
  next();
});


// Validation for users
NoteSchema.pre('validate', async function(next) {
  
  if(!Array.isArray(this.users)) {
    next(new Error('Users is required and must be an array!'));
    return;
  }

  if(this.users.length === 0) {
    next(new Error('Must have at least one user!'));
    return;
  }

  for(const user of this.users) {
    const result = await User.exists({ _id: user }).exec();

    if(!result) {
      next(new Error(`User does not exists!`));
      return;
    }
  }

  next();
});

// Validation for tags
NoteSchema.pre('validate', async function(next) {

  if(this.tags) {

    if(!Array.isArray(this.tags)) {
      next(new Error(`Tags must be an array, got ${typeof this.tags}`));
      return;
    }

    for(const tag of this.tags) {
      const results = await Tag.exists({ _id: tag }).exec();

      if(!results) {
        next(new Error(`Tag does not exists!`));
        return;
      }
    }
  }
  next();
});


const Note = model('Note', NoteSchema);
export default Note;
