import { Expose, Type } from 'class-transformer';

export class RoleParcialDto {
  @Expose()
  roleId: number;

  @Expose()
  name: string;
}

export class PermissionParcialDto {
  @Expose()
  permissionId: number;

  @Expose()
  controller: string;

  @Expose()
  action: string;
}

export class RolePermissionsDto {
  @Expose()
  rolePermissionsId: number;

  @Expose()
  roleId: number;

  @Expose()
  permissionId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  active: boolean;

  @Expose()
  @Type(() => RoleParcialDto)
  role: RoleParcialDto;

  @Expose()
  @Type(() => PermissionParcialDto)
  permission: PermissionParcialDto;
}
