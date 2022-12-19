import Note from '../model';
import { Request } from 'express';
import User from '../../users/model';
import { Document, Types } from 'mongoose';
import Tag from '../../tags/model';
import { CallbackFn } from '../util/callback';

export async function createNote(req: Request, done: CallbackFn) { 
  const { title, body } = req.body;
  let user: Document<any, any, typeof User> | null = null;

  const userId : string = req['auth']['userId'];

  try {
    user = await User.findById(userId).exec();
    if(!user) {
      const error = { message: 'User not found!' };
      return done(error, null);
    }
  } catch(error) {
    return done(error as { message: string }, null);
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

export async function getNote(req: Request, done: CallbackFn) {
  const { id } = req.params;
  const userId = req['auth']['userId'];

  Note.findById(id, undefined, (error, note) => {

    if(error) {
      return done(error);
    }

    if(!note) {
      const error = { message: 'Note not found!' };
      return done(error, null);  
    }

    // Verifying user permission
    if(!note.users.find(v => userId == v)) {
      return done(new Error('Note not found!'), null);
    }

    return done(null, note.toObject());
  });
}

export async function getNotesFromUser(req: Request, done: CallbackFn) {
  const { userId } = req.params;

  const fromTokenUserId = req['auth']['userId'];
  // Verifying user permission
  if(userId != fromTokenUserId) {
    return done(null, [] as any);
  }

  Note.find({ users: userId }, undefined, (error, notes) => {

    if(error) {
      done(error);
      return;
    }
    done(null, notes.map(note => note.toObject()) as any);
  }); 
}

export async function updateNote(req: Request, done: CallbackFn) {
  const { id } = req.params;
  const { title, body, users, tags } = req.body;
  
  const fieldstoUpdate = {title, body, users, tags};
  const toUpdate = {};
  const userId = req['auth']['userId'];

  for(const f in fieldstoUpdate) {
    if(fieldstoUpdate[f]) {
      toUpdate[f] = fieldstoUpdate[f];
    }
  }

  try {
    const note = await Note.findById(id).exec();

    if(!note) {
      const error = { message: 'Note not found!' };
      done(error, null);
      return;
    }

    // Verifying user permission
    if(!note.users.find(u => userId == u)) {
      return done(new Error('Note not found!'), null);
    }

    note.set(toUpdate);
    note.save((error, data) => {
      if(error) {
        done(error, null);
        return;
      }
      done(null, data.toObject());
      return;
    });
  } catch(error) {
    done(error as Error);
    return;
  }

  return;
}

export async function deleteNote(req: Request, done: CallbackFn) {
  const { id } = req.params;
  const userId = req['auth']['userId'];

  try {
    const note = await Note.findById(id).exec();

    if(!note) {
      const error = { message: 'Note not found!' };
      done(error);
      return;
    }

    // Verifying user permission
    if(!note.users.find(u => userId == u)) {
      return done(new Error('Note not found!'), null);
    }

    note.delete((error, result) => {

      if(error) {
        done(error);
        return;
      }
      done(null, result.toObject());
    });

  } catch(error) {
    done(error as Error);
    return;
  }

  return;
}