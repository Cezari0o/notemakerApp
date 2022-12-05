import { Request } from "express";
import { Document } from "mongoose";
import User from "../../users/model";
import Tag from "../model";

export async function createTag(req: Request, done: Function) {
  const { title, userId } = req.body;


  let user: Document | null = null;
  try {
    user = await User.findById(userId).exec();
  } catch(error) {
    done(error);
    return;
  }
  const tag = new Tag({ title: title, userId: user });

  tag.save((error, data) => {

    if(error) {
      done(error);
      return;
    }
    done(null, data);
  });
}

export async function getTag(req: Request, done: Function) {
  const { id } = req.params;

  Tag.findById(id, undefined, undefined, (error, data) => {

    if(error) {
      done(error);
      return
    }

    if(!data) {
      const msg = { message: 'Tag not found!' };
      done(msg, null);
      return;
    }

    done(null, data);
  });
}


export async function deleteTag(req: Request, done: Function) {
  const { id } = req.params;

  Tag.findById(id, undefined, undefined, (error, data) => {

    if(error) {
      done(error);
      return;
    }

    if(!data) {
      const msg = { message: "Tag not found!" };
      done(msg, null);
      return;
    }

    data.delete((error, result) => {

      if(error) {
        done(error);
        return;
      }

      return done(null, result.toObject());
    });
  });

}

export async function getTagsFromUser(req: Request, done: Function) {
  const { id } = req.params;
  
  Tag.find({ userId: id }, undefined, undefined, (error, data) => {

    if(error) {
      done(error);
      return;
    }

    done(null, data.map(d => {
      const ret: { userId?: any } = d.toObject();

      delete ret.userId;

      return ret;

    }));  
  });

}