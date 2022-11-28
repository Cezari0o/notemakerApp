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
    return done(null, data);
  });
}