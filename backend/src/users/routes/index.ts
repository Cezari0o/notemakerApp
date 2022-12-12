import { Router } from "express";
import HttpStatus from "http-status-codes";
import { createUser, getUserById } from "../controller";

const routes = Router();

// Creates a new user
routes.post('/', (req, res) => {
  
  function onSave(error: any, data: any) {
    if(error) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad data format!', message: error.message });
      return;
    }

    res.status(HttpStatus.CREATED).json(data);
  }
  createUser(req, onSave);
});

// Get user by id
// routes.get('/:id', (req, res) => {

//   getUserById(req, (error: any, data: any) => {

//     if(error) {
//       res.status(HttpStatus.NOT_FOUND).json({ error: 'Searching went wrong!', message: error.message });
//       return;
//     }

//     res.status(HttpStatus.OK).json(data);
//   })

// });

export default routes;
