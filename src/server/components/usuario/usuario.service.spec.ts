/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import { Schema } from 'mongoose';

import { ApplicationModule } from '@/server/app.module';
import { Usuario, UsuarioDoc, UsuarioInput } from '@/server/models';
import { UsuarioService } from './usuario.service';
import { UsuarioResolver } from './usuario.resolver';

describe('Usuario', () => {
  let usuarioService: UsuarioService;
  let usuarioResolver: UsuarioResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    usuarioService = module.get<UsuarioService>(UsuarioService);
    usuarioResolver = module.get<UsuarioResolver>(UsuarioResolver);
  });

  it('findAll', async () => {
    const result = [new Usuario()];
    jest
      .spyOn(usuarioService, 'findAll')
      .mockImplementation(
        async (_?: number, __?: number) => (await result) as UsuarioDoc[]
      );

    expect(await usuarioResolver.findAllUsuarios({})).toBe(result);
  });

  it('findOne', async () => {
    const id: Schema.Types.ObjectId = new Schema.Types.ObjectId('1');
    const result = new Usuario();
    jest
      .spyOn(usuarioService, 'findOne')
      .mockImplementation(
        async (_: Schema.Types.ObjectId) => (await result) as UsuarioDoc
      );

    expect(await usuarioResolver.findUsuario({ _id: id })).toBe(result);
  });

  // it('update', async () => {
  //   const id: Schema.Types.ObjectId = new Schema.Types.ObjectId('1');
  //   const result = new Usuario();
  //   jest
  //     .spyOn(usuarioService, 'createOrUpdate')
  //     .mockImplementation(
  //       async (_: UsuarioInput, __?: Schema.Types.ObjectId) =>
  //         result as UsuarioDoc
  //     );

  //   expect(await usuarioResolver.findUsuario({ _id: id })).toBe(result);
  // });
});
