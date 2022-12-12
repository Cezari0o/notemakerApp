import { Request, Response } from "express";
import { UnauthorizedError } from "express-jwt";

function errorHandler(error: Error, req: Request, res: Response, next: Function) {

  if(error instanceof UnauthorizedError) {
    res.status(error.status).json({ error: error.message });
    return;
  }

  next(error);
}


export default errorHandler;