import { model, Schema, ValidatorProps } from "mongoose";
import validator from "validator";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name: String) => {
      
        return validator.isLength(name as string, { min: 1 });
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
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  }
});

const User = model('User', UserSchema);

export default User;