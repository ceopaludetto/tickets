import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ExtractAuthTokenFromCookie } from '@/server/utils/jwt.cookie.extractor';
import { PayloadType } from '@/server/utils/common.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractAuthTokenFromCookie,
      ignoreExpiration: false,
      secretOrKey: 'teste',
    });
  }

  public validate = (payload: PayloadType) => {
    return { ID: payload.ID, Email: payload.Email };
  };
}
