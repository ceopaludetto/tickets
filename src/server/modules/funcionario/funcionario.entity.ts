import { hash, compare } from 'bcryptjs';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity('Funcionario')
@ObjectType()
export class Funcionario {
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
