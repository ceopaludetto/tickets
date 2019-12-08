import { PayloadType } from '@/server/utils/common.dto';

declare module 'express' {
  interface Request {
    user: PayloadType;
    cookies: {
      auth: string;
    };
  }
}
