import { Controller, Get, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { ReactService } from './react.service';
import { STATIC_FOLDER } from '@/server/utils/constants';

function filter(wildcard: string, str: string) {
  const re = new RegExp(`^${wildcard.replace(/\*/g, '.*').replace(/\?/g, '.')}$`, 'i');
  return re.test(str);
}

@Controller('')
export class ReactController {
  private readonly reactService: ReactService;

  public constructor(reactService: ReactService) {
    this.reactService = reactService;
  }

  @Get('*')
  public renderReact(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const ignore = ['/robots.txt', '/api*'];
    return ignore.some(v => filter(v, req.url)) ? next() : this.reactService.render({ req, res });
  }

  @Get('/robots.txt')
  // eslint-disable-next-line class-methods-use-this
  public robots(@Res() res: Response) {
    return res.sendFile(STATIC_FOLDER.concat('/public/robots.txt'));
  }
}
