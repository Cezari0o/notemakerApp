import { expressjwt } from "express-jwt";
import express from 'express';
import { NotCreatedError, NotFoundError } from "../../util/errorClasses";
import { loginUser } from "../controller";
import HttpStatus from "http-status-codes";

const router = express.Router();

router.post('/', (req, res) => {

  loginUser(req, (error, data) => {

    if(error) {

      if(error instanceof NotFoundError) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
      }

      if(error instanceof NotCreatedError) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }

    let response = res.setHeader('Authorization', 'Bearer ' + data as string);
    return response.status(HttpStatus.ACCEPTED).send();
  });

});

export default router;