import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('authentications')
export class AuthenticationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  authenticationId: number;

  @Column({ type: 'varchar', nullable: true })
  userUuid: string;

  @Column({ type: 'varchar', length: 25 })
  type: string;

  @Column({ type: 'varchar', length: 200 })
  secret: string;

  @Column({ type: 'bool', default: true })
  active: boolean;
}
