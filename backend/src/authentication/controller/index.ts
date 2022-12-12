import { Request } from "express";
import jwt from "jsonwebtoken";
import User from "../../users/model";
import argon from "argon2";
import { NotCreatedError, NotFoundError } from "../../util/errorClasses";
import fs from 'fs/promises';
import readKey from "../util/readKey";

export async function loginUser(req: Request, done: (error: Error | null, token?: string | null) => void) {
  const { email, password } = req.body;
  const errorMsg = 'Incorrect email or password';

  if(!email || !password) {
    done(new NotFoundError(errorMsg));
  }

  User.findOne({ email: email }, undefined, async (error, user) => {

    if(error) {
      return done(error);
    }

    if(!user) {
      return done(new NotCreatedError("No user with this email"));
    }
    
    try {
      const isUser = await argon.verify(user.password, password, { secret: Buffer.from(process.env.PEPPER as string) });
      if(isUser) {   

        const token = jwt.sign({ userId: user.id }, await readKey('key'), { algorithm: "RS512", expiresIn: "3d", encoding: "utf8", });
        
        done(null, token);

        return;
      }        
      return done(new NotFoundError(errorMsg), null);
    } catch (error) {
      done(error as Error);
    }

  });

}