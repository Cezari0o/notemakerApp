import User from '../model';

export type CallbackFn = (error: { message: string} | null | Error, data?: typeof User | null) => void;