import { hash, compare } from 'bcryptjs';
import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';

import { Empresa } from '@/server/modules/empresa/empresa.entity';
import { GettersAndSetters } from '@/server/utils/setters';

export enum EnumPerfis {
  USUARIO_FINAL = 'USUARIO_FINAL',
  SUPORTE = 'SUPORTE',
  ANALISTA = 'ANALISTA',
  COORDENADOR = 'COORDENADOR',
  GERENTE = 'GERENTE',
  DIRETOR = 'DIRETOR',
  CONSULTOR_EXTERNO = 'CONSULTOR_EXTERNO',
  VIP = 'VIP',
}

registerEnumType(EnumPerfis, {
  name: 'Perfis',
});

@Entity('Funcionario')
@ObjectType()
export class Funcionario extends GettersAndSetters {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public ID: string;

  @Field()
  @Column()
  public Nome: string;

  @Field()
  @Column()
  public Sobrenome: string;

  @Field()
  @Column({ unique: true })
  public Email: string;

  @Field()
  @Column()
  public Password: string;

  @Field()
  @Column()
  public Cargo: string;

  @Field()
  @Column({ type: 'enum', enum: EnumPerfis, default: EnumPerfis.USUARIO_FINAL })
  public Perfil: EnumPerfis;

  @Field()
  @ManyToOne(() => Empresa, {
    eager: true,
  })
  @JoinColumn({
    name: 'Empresa',
    referencedColumnName: 'ID',
  })
  public Empresa: Empresa;

  @Field()
  @CreateDateColumn()
  public readonly Criacao_Data: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ nullable: true })
  public readonly Atualizacao_Data?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword() {
    if (this.Password) {
      const newPassword = await hash(this.Password, 10);
      this.Password = newPassword;
    }
  }

  public async comparePasswords(password: string) {
    const isValid = await compare(password, this.Password);
    return isValid;
  }
}
