import { Request } from "express";
import { Document } from "mongoose";
import User from "../../users/model";
import Tag from "../model";
import { CallbackFn } from "../util/callback";

export async function createTag(req: Request, done: CallbackFn) {
  const { title, userId } = req.body;
  let user: Document | null = null;

  if(userId != req['auth'].userId) {
    done(new Error('Invalid user id!'));
    return;
  }
  
  try {
    user = await User.findById(userId).exec();
  } catch(error) {
    done(error as Error);
    return;
  }
  const tag = new Tag({ title: title, userId: user });

  tag.save((error, data) => {

    if(error) {
      done(error);
      return;
    }
    done(null, data.toObject());
  });
}

export async function getTag(req: Request, done: CallbackFn) {
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

    if(data.userId != req['auth'].userId) {
      done(new Error('Tag not found!'), null);
      return;
    }

    done(null, data.toObject());
  });
}


export async function deleteTag(req: Request, done: CallbackFn) {
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

    if(data.userId !== req['auth'].userId) {
      done(new Error('Tag not found!'), null);
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

export async function getTagsFromUser(req: Request, done: CallbackFn) {
  const { id } = req.params;

  if(id !== req['auth'].userId) {
    done(null, [] as any);
    return;
  }
  
  Tag.find({ userId: id }, undefined, undefined, (error, data) => {

    if(error) {
      done(error);
      return;
    }

    done(null, data.map(d => {
      const ret: { userId?: any } & (typeof Tag) = d.toObject();

      delete ret.userId;

      return ret;

    }) as any);  
  });

}