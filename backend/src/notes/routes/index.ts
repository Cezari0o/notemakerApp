import { Router } from 'express';
import { createNote, deleteNote, getNote, getNotesFromUser, updateNote } from '../controller';
import HttpStatus from 'http-status-codes';

const routes = Router();

routes.post('/', (req, res) => {

  createNote(req, (error: any, data: any) => {

    if(error) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error while creating note', message: error.message });
      return;
    }
    res.status(HttpStatus.CREATED).json(data);
  });
});

routes.get('/', (req, res) => {
  res.status(HttpStatus.FORBIDDEN).send();
}); 

routes.get('/user/:userId', (req, res) => {

  getNotesFromUser(req, (error, data) => {

    if(error) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error while searching for notes', message: error.message });
      return;
    }
    res.status(HttpStatus.OK).json(data);
  });
});

routes.get('/:id', (req, res) => {

  getNote(req, (error, data) => {

    if(error) {
      res.status(data === null? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST).json({ error: 'Error while searching for note', message: error.message });
      return;
    }

    res.status(HttpStatus.OK).json(data);
  });

});

routes.post('/:id', (req, res) => {

  updateNote(req, (error, data) => {

    if(error) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error while updating note', message: error.message });
      return;
    }

    res.status(HttpStatus.OK).json(data);
  });
});


routes.delete('/:id', (req, res) => {

  deleteNote(req, (error, data) => {

    if(error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error while deleting note', message: error.message });
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  });
});


export default routes;