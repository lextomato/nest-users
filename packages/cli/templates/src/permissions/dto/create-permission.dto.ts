import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
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

  @ApiProperty({
    description: 'Path del controlador',
    example: '/users',
  })
  path: string;
}
