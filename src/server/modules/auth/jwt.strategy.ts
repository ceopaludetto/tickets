import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ExtractAuthTokenFromCookie } from '@/server/customs/jwt.cookie.extractor';
import { PayloadType } from '@/server/utils/common.dto';
import { ConfigurationService } from '@/server/modules/configuration/configuration.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(configService: ConfigurationService) {
    super({
      jwtFromRequest: ExtractAuthTokenFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.SECRET,
    });
  }

  public validate = ({ _id, email, permissao }: PayloadType) => {
    return { _id, email, permissao };
  };
}
