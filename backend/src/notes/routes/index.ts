import { Router } from 'express';
import { createNote } from '../controller';
import HttpStatus from 'http-status-codes';

const routes = Router();

routes.post('/', (req, res) => {

  createNote(req, (error: any, data: any) => {

    if(error) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error while creating note!', message: error.message });
      return;
    }
    res.status(HttpStatus.CREATED).json(data);
  });
});

routes.get('/', (req, res) => {
  
});


export default routes;