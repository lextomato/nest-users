import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreatePermissionConflictDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'El permiso ya existe.',
  })
  message: string;

  @ApiProperty({
    description: 'Nombre de controlador del permiso',
    example: 'Users',
  })
  controller: string;

  @ApiProperty({
    description: 'Nombre de la accion del permiso',
    example: 'findAll',
  })
  action: string;
}

export class ResponsePermissionConflictDto {
  @ApiProperty({ description: 'Estatus del response', example: 'error' })
  status: string;

  @ApiProperty({
    description: 'Mensaje del response',
    example: 'No se encuentra el permiso.',
  })
  message: string;

  @ApiProperty({
    description: 'Identificador de permiso',
    example: 1,
  })
  permissionId: number;
}
