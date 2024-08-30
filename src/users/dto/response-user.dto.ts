import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    description: 'Identificador de usuario',
    example: 'c72dbyy5-21bf-4099-a6fb-2eb576bac434',
  })
  @Expose()
  userUuid: string;

  @ApiProperty({
    description: 'El email de usuario',
    example: 'ejemplo@dominio.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Usuario habilitado?',
    example: true,
  })
  @Expose()
  active: boolean;

  @ApiProperty({ description: 'El nombre de usuario', example: 'John' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'El apellido de usuario', example: 'Torres' })
  @Expose()
  lastname: string;

  @ApiProperty({ description: 'Id del rol de usuario', example: 1 })
  @Expose()
  roleId: number;
}
