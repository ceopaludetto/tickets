import { PayloadType } from '@/server/utils/common.dto';

declare module 'express' {
  interface Request {
    empresa: string;
    user: PayloadType;
    cookies: {
      AUTH: string;
    };
  }
}
