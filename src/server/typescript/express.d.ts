import { Types } from 'mongoose';

declare module 'express' {
  interface Request {
    empresa?: Types.ObjectId;
    headers: {
      empresa?: string;
    };
  }
}
