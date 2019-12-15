import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { ReactService } from './react.service';
import { STATIC_FOLDER } from '@/server/utils/constants';

@Controller('')
export class ReactController {
  private readonly reactService: ReactService;

  public constructor(reactService: ReactService) {
    this.reactService = reactService;
  }

  @Get('*')
  public renderReact(@Req() req: Request, @Res() res: Response) {
    return this.reactService.render({ req, res });
  }

  @Get('/robots.txt')
  // eslint-disable-next-line class-methods-use-this
  public robots(@Res() res: Response) {
    return res.sendFile(STATIC_FOLDER.concat('/public/robots.txt'));
  }
}
