import Note from '../model';
import { Request } from 'express';

const NoteController = {
  
  createNote: function (req: Request,  done: Function) { 
    const { user, title, body, tags } = req.body;

    const note = new Note({
      user: user,
      title: title,
      body: body,
      tags: [],
      createdAt: new Date(),
      lastUpdate: new Date(),
    });

    note.save((error, data) => {
      if (error) {
        return done(error);
      }
      return done(null, data);
    })
  }
}