import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { PayloadType } from '@/server/utils/common.dto';
import { ConfigurationService } from '@/server/components/Configuration';
import { ExtractAuthTokenFromCookie } from '@/server/utils/jwt.cookie.extractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor({ auth: { secret } }: ConfigurationService) {
    super({
      jwtFromRequest: ExtractAuthTokenFromCookie,
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  public validate = ({ id, email }: PayloadType) => {
    return { id, email };
  };
}
