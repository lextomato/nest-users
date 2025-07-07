import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('sessions')
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  sessionId: number;

  @Column({ type: 'varchar', nullable: true })
  userUuid: string;

  @Column({ type: 'varchar', length: 200 })
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ipAddress: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  userAgent: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
