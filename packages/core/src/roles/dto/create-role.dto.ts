import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Nombre de rol',
    example: 'usuario',
  })
  name: string;

  @ApiProperty({
    description: 'Descripcion de rol',
    example: 'Usuario comun',
  })
  description: string;
}
