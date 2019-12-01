import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ExtractAuthTokenFromCookie } from '@/server/utils/jwt.cookie.extractor';
import { PayloadType } from '@/server/utils/common.dto';
import { ConfigurationService } from '@/server/components/Configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
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
