import { Router } from "express";
import HttpStatus from "http-status-codes";
import { createUser } from "../controller";

const routes = Router();

// Creates a new user
routes.post('/', (req, res) => {
  
  function onSave(error: any, data: any) {
    if(error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad data format', error: error });
      return;
    }

    res.status(HttpStatus.CREATED).json(data);
  }
  createUser(req, onSave);
});

export default routes;
