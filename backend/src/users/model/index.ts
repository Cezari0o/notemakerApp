import { model, Schema, ValidatorProps } from "mongoose";
import validator from "validator";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name: String) => {
      
        return validator.isLength(name as string, { min: 1, max: 150 });
      },
      message: (props: ValidatorProps) => `Name must have at least 1 character, got ${props.value.length}`,
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email: String) => validator.isEmail(email as string),
      message: (props: ValidatorProps) => `Email must be valid, got ${props.value}`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password: String) => validator.isStrongPassword(password as string),
      message: () => `Password must be strong (see the docs for more info)`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  }
}, {
  toObject: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

const User = model('User', UserSchema);

UserSchema.pre('save', function(next) {

  this.lastUpdate = new Date();
  next();
});

export default User;