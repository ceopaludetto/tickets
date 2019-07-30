import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { ReactService } from './react.service';

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
}
