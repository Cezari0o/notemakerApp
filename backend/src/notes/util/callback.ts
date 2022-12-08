import Note from "../model";

export type CallbackFn = (error: Error | null | { message: string }, data?: typeof Note | null | (typeof Note)) => void;