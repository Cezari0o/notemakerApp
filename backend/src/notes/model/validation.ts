import Tag from "../../tags/model";
import User from "../../users/model";


export async function validateUsers(this: any, next: Function) {
  if (!Array.isArray(this.users)) {
    next(new Error('Users is required and must be an array!'));
    return;
  }

  if (this.users.length === 0) {
    next(new Error('Must have at least one user!'));
    return;
  }

  for (const user of this.users) {
    const result = await User.exists({ _id: user }).exec();

    if (!result) {
      next(new Error(`User does not exists!`));
      return;
    }
  }

  next();
}

export async function validateTags(this: any, next: Function) {

  if(this.tags) {

    if(!Array.isArray(this.tags)) {
      next(new Error(`Tags must be an array, got ${typeof this.tags}`));
      return;
    }

    for(const tag of this.tags) {
      const results = await Tag.exists({ _id: tag }).exec();

      if(!results) {
        next(new Error(`Tag does not exists!`));
        return;
      }
    }
  }
  next();
}