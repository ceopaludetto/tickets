import { IsUUID, IsString } from 'class-validator';

export class FindOneParam {
  @IsUUID()
  @IsString()
  public id!: string;
}

export interface PayloadType {
  id: string;
  email: string;
}
