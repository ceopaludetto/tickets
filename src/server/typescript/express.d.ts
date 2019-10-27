import { Types } from 'mongoose';
import { PayloadType } from '@/server/utils/common.dto';

declare module 'express' {
  interface Request {
    empresa?: Types.ObjectId;
    headers: {
      empresa?: string;
    };
    user: PayloadType;
  }
}
