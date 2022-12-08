import Tag from "../model";

export type CallbackFn = (error: Error | null | { message: string }, data?: typeof Tag | null) => void;