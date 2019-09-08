import { Controller, Get, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { ReactService } from './react.service';
import { PUBLIC_PATH, STATIC_FOLDER } from '@/server/utils/constants';

@Controller('')
export class ReactController {
  private readonly reactService: ReactService;

  public constructor(reactService: ReactService) {
    this.reactService = reactService;
  }

  @Get('*')
  public renderReact(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    const ignore = [
      '/graphql',
      `${PUBLIC_PATH}/public/manifest.json`,
      '/robots.txt',
    ];
    return ignore.filter(i => i === req.url).length
      ? next()
      : this.reactService.render({ req, res });
  }

  @Get('/robots.txt')
  // eslint-disable-next-line class-methods-use-this
  public robots(@Res() res: Response) {
    return res.sendFile(STATIC_FOLDER.concat('/public/robots.txt'));
  }
}
