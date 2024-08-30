import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RolesEntity } from './roles.entity';
import { PermissionsEntity } from './permissions.entity';

@Entity({ schema: 'public', name: 'rolePermissions' })
export class RolePermissionsEntity {
  @PrimaryGeneratedColumn('increment')
  rolePermissionsId: number;

  @Column({ type: 'int' })
  roleId: number;

  @Column({ type: 'int' })
  permissionId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => RolesEntity)
  @JoinColumn({ name: 'roleId' })
  role: RolesEntity;

  @ManyToOne(() => PermissionsEntity)
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionsEntity;
}
