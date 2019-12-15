import { IsString } from 'class-validator';
import { Request, Response } from 'express';

import { IsShortID } from './isShortid';

export class FindOneParam {
  @IsShortID()
  @IsString()
  public id!: string;
}

export interface PayloadType {
  id: string;
  email: string;
}

export interface ContextType {
  req: Request;
  res: Response;
}

export interface ReactContextType {
  url?: string;
}
