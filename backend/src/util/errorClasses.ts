
export class NotFoundError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "NotFoundError";
  }
};

export class NotCreatedError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "NotCreatedError";
  }
}