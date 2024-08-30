import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RoleDto {
  @ApiProperty({
    description: 'Identificador de rol',
    example: 1,
  })
  @Expose()
  roleId: number;

  @ApiProperty({
    description: 'Nombre de rol',
    example: 'usuario',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Descripcion de rol',
    example: 'Usuario comun',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Rol habilitado?',
    example: true,
  })
  @Expose()
  active: boolean;
}
