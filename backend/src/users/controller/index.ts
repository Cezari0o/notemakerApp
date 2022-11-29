import { Request } from "express";
import User from "../model";

export function createUser(req: Request, done: Function) {
  const { name, email, password } = req.body;

  const newUser = new User({
    name: name,
    email: email,
    password: password,
  });

  newUser.save((error, data) => {

    if (error) {
      return done(error);
    }
    return done(null, data.toObject());
  });
}

export function getUserById(req: Request, done: Function) {
  const { id } = req.params;

  User.findById(id, undefined, (error, user) => {

    if(error) {
      return done(error);
    }

    if(!user) {
      const error = { message: 'User not found!' };
      return done(error, null);
    }

    return done(null, user.toObject());
  });
}

export function getUserByName(req: Request, done: Function) {
  const { name } = req.params;

  User.find({ name: name }, undefined, (error, users) => {

    if(error) {
      return done(error);
    }

    if(!users) {
      const error = { message: 'User not found!' };
      return done(error, null);
    }

    return done(null, users);
  });

}