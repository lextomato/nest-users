import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionsDto {
  @ApiProperty({
    description: 'Identificador del permiso',
    example: 1,
  })
  permissionId: number;

  @ApiProperty({
    description: 'Lista de Id de roles',
    example: [1, 2, 3],
  })
  roles: number[];
}
