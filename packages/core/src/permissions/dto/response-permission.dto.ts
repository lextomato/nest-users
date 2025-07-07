import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PermissionDto {
  @ApiProperty({
    description: 'Identificador de permiso',
    example: 1,
  })
  @Expose()
  permissionId: number;

  @ApiProperty({
    description: 'Nombre de controlador del permiso',
    example: 'Users',
  })
  @Expose()
  controller: string;

  @ApiProperty({
    description: 'Nombre de la accion del permiso',
    example: 'findAll',
  })
  @Expose()
  action: string;

  @ApiProperty({
    description: 'Path del controlador',
    example: '/users',
  })
  @Expose()
  path: string;

  @ApiProperty({
    description: 'Permiso habilitado?',
    example: true,
  })
  @Expose()
  active: boolean;
}

export class RolePartialDto {
  roleId: number;
  name: string;
  active: boolean;
}

export class ActionOfControllerDto {
  permissionId: number;
  action: string;
  path: string;
  active: boolean;
  roles: RolePartialDto[];
}

export class PermissionOfControllerDto {
  @ApiProperty({
    description: 'Nombre de controlador del permiso',
    example: 'Users',
  })
  @Expose()
  controller: string;

  @ApiProperty({
    description: 'Acciones de permisos',
    example: {
      permissionId: 1,
      action: 'findAll',
      path: '/users',
      active: true,
      roles: [
        {
          roleId: 1,
          name: 'usuario',
          active: true,
        },
        {
          roleId: 2,
          name: 'admin',
          active: true,
        },
      ],
    },
  })
  @Expose()
  actions: ActionOfControllerDto[];
}

export class RolePermissionsAsingDto {
  @ApiProperty({ description: 'Estatus del response', example: 'ok' })
  @Expose()
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'Permisos asignados correctamente al rol.',
  })
  @Expose()
  message: string;
}
