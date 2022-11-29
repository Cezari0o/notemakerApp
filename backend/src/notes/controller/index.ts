import Note from '../model';
import { Request } from 'express';
import User from '../../users/model';
import { Types } from 'mongoose';

export async function createNote(req: Request, done: Function) { 
  const { userId, title, body } = req.body;

  const user = await User.findById(userId).exec();
  if(!user) {
    const error = { message: 'User not found!' };
    return done(error, null);
  }

  const note = new Note({
    users: [user],
    title: title,
    body: body,
    tags: [],
  });

  note.save((error, data) => {
    if (error) {
      return done(error);
    }
    return done(null, data.toObject());
  })
}
