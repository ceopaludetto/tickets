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
  AfterLoad,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Empresa } from '@/server/modules/empresa/empresa.entity';

@Entity('Funcionario')
@ObjectType()
export class Funcionario {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly ID!: string;

  @Field()
  @Column()
  public Nome!: string;

  @Field()
  @Column()
  public Sobrenome!: string;

  @Field()
  @Column({ unique: true })
  public Email!: string;

  @Field()
  @Column()
  public Password!: string;

  @Field()
  @Column()
  public Cargo!: string;

  @Field(() => Empresa)
  @ManyToOne(() => Empresa)
  @JoinColumn({
    name: 'Empresa',
    referencedColumnName: 'ID',
  })
  public Empresa!: Empresa;

  @Field()
  @CreateDateColumn()
  public readonly Criacao_Data!: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ nullable: true })
  public readonly Atualizacao_Data?: Date;

  private TempPassword: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.TempPassword = this.Password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword() {
    if (this.Password !== this.TempPassword) {
      const newPassword = await hash(this.Password, 10);
      this.Password = newPassword;
    }
  }

  public async comparePasswords(password: string) {
    const isValid = await compare(password, this.Password);
    return isValid;
  }
}
