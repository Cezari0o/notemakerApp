import { Router } from "express";
import HttpStatus from "http-status-codes";
import { createNote } from "../../notes/controller";
import { createTag, deleteTag, getTag, getTagsFromUser } from "../controller";

const routes = Router();

routes.get('/:id', (req, res) => {

  getTag(req, (error, data) => {

    if(error) {
      res.status(data === undefined? HttpStatus.BAD_REQUEST : HttpStatus.NOT_FOUND).json({ error: 'Error while retrieving tag!', message: error.message });
      return;
    }

    res.status(HttpStatus.OK).json(data.toObject());
  })
});

routes.post('/', (req, res) => {

  createTag(req, (error, data) => {

    if(error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error while creating tag!', message: error.message });
      return;
    }

    res.status(HttpStatus.CREATED).json(data.toObject());
  });
});

routes.delete('/:id', (req, res) => {

  deleteTag(req, (error, data) => {

    if(error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error while deleting tag!', message: error.message });
      return;
    }
    res.status(HttpStatus.NO_CONTENT).send();
  });
});

routes.get('/user/:id', (req, res) => {

  getTagsFromUser(req, (error, data) => {

    if(error) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error while retrieving tags!', message: error.message });
    }

    res.status(HttpStatus.OK).json(data);
  });
});

export default routes;