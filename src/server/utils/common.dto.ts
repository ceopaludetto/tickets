import { IsString } from 'class-validator';

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
