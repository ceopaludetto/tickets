import { IsString } from 'class-validator';
import { Request, Response } from 'express';

import { EnumNivelAcesso, EnumTipoAcesso } from '@/server/models/politica';
import { Usuario } from '@/server/models/usuario';

import { IsShortID } from './validations/isShortid';

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

export interface BaseEntityDTO {
  id: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  dataExclusao: Date;
}

export interface Role {
  nivel: EnumNivelAcesso;
  tipo: EnumTipoAcesso;
  useUserID: boolean;
}

export interface CustomMatcherOptions {
  customMatcher: (usuario: Usuario, args: any) => boolean;
  errorText?: string;
}
