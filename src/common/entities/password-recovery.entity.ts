import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('passwordRecoveries')
export class PasswordRecoveryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  recoveryId: number;

  @Column({ type: 'varchar', length: 200 })
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'varchar', nullable: true })
  userUuid: string;
}
