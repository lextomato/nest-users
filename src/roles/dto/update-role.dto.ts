import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ description: 'El nombre del rol', example: 'usuario' })
  name: string;

  @ApiProperty({ description: 'Descripcion del rol', example: 'Usuario comun' })
  description: string;
}
