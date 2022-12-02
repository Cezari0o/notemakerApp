import Note from '../model';
import { Request } from 'express';
import User from '../../users/model';
import { Types } from 'mongoose';
import Tag from '../../tags/model';

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

export async function getNote(req: Request, done: Function) {
  const { id } = req.params;
  
  Note.findById(id, undefined, (error, note) => {

    if(error) {
      return done(error);
    }

    if(!note) {
      const error = { message: 'Note not found!' };
      return done(error, null);  
    }

    return done(null, note.toObject());
  });
}

export async function getNotesFromUser(req: Request, done: Function) {
  const { userId } = req.params;

  Note.find({ users: userId }, undefined, (error, notes) => {

    if(error) {
      done(error);
      return;
    }
    done(null, notes.map(note => note.toObject()));
  }); 
}

export async function updateNote(req: Request, done: Function) {
  const { id } = req.params;
  const { title, body, users, tags } = req.body;
  
  try {
    const note = await Note.findById(id).exec();

    if(!note) {
      const error = { message: 'Note not found!' };
      done(error, null);
      return;
    }

    note.set({ title, body, users, tags });
    note.save((error, data) => {
      if(error) {
        done(error, null);
        return;
      }
      done(null, data.toObject());
      return;
    });
  } catch(error) {
    done(error);
    return;
  }

  return;
}