import User from "../../users/model";

export async function validateUser(this: any, next: Function) {

  if(!this.userId) {
    return next(new Error('User is required!'));
  }

  try {
    const result = User.exists({ _id: this.userId }).exec();

    if(!result) {
      next(new Error("User does not exists!"));
      return;
    }

    next();
  } catch(error) {
    next(error);
    return;
  }

}