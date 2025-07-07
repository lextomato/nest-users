import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'public', name: 'permissions' })
export class PermissionsEntity {
  @PrimaryGeneratedColumn('increment')
  permissionId: number;

  @Column({ type: 'varchar' })
  controller: string;

  @Column({ type: 'varchar' })
  action: string;

  @Column({ type: 'varchar' })
  path: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
