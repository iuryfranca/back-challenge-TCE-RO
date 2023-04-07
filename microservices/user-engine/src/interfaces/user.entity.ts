import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  affiliation: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: 'ACTIVATE' })
  status: 'ACTIVATE' | 'INACTIVATE';
}
